const { MoleculerError } = require('moleculer').Errors;
const { MIME_TYPES } = require('@semapps/mime-types');
const path = require('path');
const fs = require('fs');

module.exports = {
  api: async function api(ctx) {
    let { containerUri, ...resource } = ctx.params;
    try {
      let resourceUri;
      if (ctx.meta.parser !== 'file') {
        resourceUri = await ctx.call('ldp.resource.post', {
          containerUri: containerUri,
          slug: ctx.meta.headers.slug,
          resource,
          contentType: ctx.meta.headers['content-type'],
          accept: MIME_TYPES.JSON
        });
      } else {
        if (ctx.params.files) {
          let file;
          if (ctx.params.files.length > 1) {
            throw new MoleculerError(`Multiple file upload not supported`, 400, 'BAD_REQUEST');
          } else {
            file = ctx.params.files[0];
          }
          resourceUri = await ctx.call('ldp.resource.post', {
            containerUri: containerUri,
            slug: file.filename || ctx.meta.headers.slug,
            resource: {
              '@context': {
                semapps: 'http://semapps.org/ns/core#'
              },
              '@type': 'semapps:File',
              'semapps:encoding': file.encoding,
              'semapps:mimeType': file.mimetype
            },
            contentType: MIME_TYPES.JSON,
            accept: MIME_TYPES.JSON,
            fileStream: file.readableStream
          });
        }
      }
      ctx.meta.$responseHeaders = {
        Location: resourceUri,
        Link: '<http://www.w3.org/ns/ldp#Resource>; rel="type"',
        'Content-Length': 0
      };
      ctx.meta.$statusCode = 201;
    } catch (e) {
      console.error(e);
      ctx.meta.$statusCode = e.code || 500;
      ctx.meta.$statusMessage = e.message;
    }
  },
  action: {
    visibility: 'public',
    params: {
      resource: 'object',
      webId: {
        type: 'string',
        optional: true
      },
      contentType: {
        type: 'string'
      },
      containerUri: {
        type: 'string'
      },
      slug: {
        type: 'string',
        optional: true
      },
      disassembly: {
        type: 'array',
        optional: true
      },
      fileStream: {
        type: 'object',
        optional: true
      }
    },
    async handler(ctx) {
      let { resource, containerUri, slug, contentType, fileStream } = ctx.params;
      let { webId } = ctx.params;
      webId = webId || ctx.meta.webId || 'anon';

      const { disassembly } = {
        ...(await ctx.call('ldp.container.getOptions', { uri: containerUri })),
        ...ctx.params
      };

      resource['@id'] = await ctx.call('ldp.resource.generateId', { containerUri, slug });

      const containerExist = await ctx.call('ldp.container.exist', { containerUri }, { meta: { webId } });
      if (!containerExist) {
        throw new MoleculerError(
          `Cannot create resource in non-existing container ${containerUri}`,
          400,
          'BAD_REQUEST'
        );
      }

      if (!resource['@context']) {
        throw new MoleculerError(`No @context is provided for the resource ${resource['@id']}`, 400, 'BAD_REQUEST');
      }

      if (fileStream) {
        const filename = resource['@id'].replace(containerUri + '/', '');
        const regex = /.*\/\/[^\/]*(\/.*)/gm;
        const containerPath = regex.exec(containerUri)[1];
        const dir = path.join('./uploads' + containerPath);
        const saveTo = path.join(dir, '/', filename);
        if (!fs.existsSync(dir)) {
          process.umask(0);
          fs.mkdirSync(dir, { recursive: true, mode: parseInt('0777', 8) });
        }
        resource['semapps:localPath'] = saveTo;
        resource['semapps:fileName'] = filename;

        try {
          fileStream.pipe(fs.createWriteStream(resource['semapps:localPath']));
        } catch (e) {
          throw new MoleculerError(e, 500, 'Server Error');
        }
      }

      if (disassembly && contentType === MIME_TYPES.JSON) {
        await this.createDisassembly(ctx, disassembly, resource);
      }

      await ctx.call('triplestore.insert', {
        resource: `<${containerUri}> <http://www.w3.org/ns/ldp#contains> <${resource['@id']}>`,
        webId
      });

      try {
        await ctx.call('triplestore.insert', {
          resource,
          contentType,
          webId
        });
      } catch (e) {
        // If there was an error inserting the resource, detach it from the container
        await ctx.call('triplestore.update', {
          query: `DELETE WHERE { <${containerUri}> <http://www.w3.org/ns/ldp#contains> <${resource['@id']}> }`,
          webId
        });

        // Re-throw the error so that it's displayed by the API function
        throw e;
      }

      const newData = await ctx.call(
        'ldp.resource.get',
        {
          resourceUri: resource['@id'],
          accept: MIME_TYPES.JSON,
          queryDepth: 1,
          forceSemantic: true,
          webId
        },
        { meta: { $cache: false } }
      );

      ctx.emit('ldp.resource.created', {
        resourceUri: resource['@id'],
        newData,
        webId
      });

      ctx.emit('ldp.container.attached', {
        containerUri,
        resourceUri: resource['@id']
      });

      return resource['@id'];
    }
  }
};
