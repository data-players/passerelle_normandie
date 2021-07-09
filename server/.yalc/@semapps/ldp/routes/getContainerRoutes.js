const {
  parseHeader,
  parseSparql,
  negotiateContentType,
  negotiateAccept,
  parseJson,
  parseFile,
  addContainerUriMiddleware
} = require('@semapps/middlewares');

function getContainerRoutes(containerUri, serviceName) {
  const commonRouteConfig = {
    path: new URL(containerUri).pathname,
    // Disable the body parsers so that we can parse the body ourselves
    // (Moleculer-web doesn't handle non-JSON bodies, so we must do it)
    bodyParsers: false
  };

  const middlewares = [
    parseHeader,
    negotiateContentType,
    negotiateAccept,
    parseSparql,
    parseJson,
    parseFile,
    addContainerUriMiddleware(containerUri)
  ];

  // If no serviceName is specified, map routes to the LDP container/resource service
  const actions = serviceName
    ? {
        list: serviceName + '.find',
        get: serviceName + '.get',
        post: serviceName + '.create',
        patch: serviceName + '.update',
        put: serviceName + '.put',
        delete: serviceName + '.remove'
      }
    : {
        list: 'ldp.container.api_get',
        head_container: 'ldp.container.api_head',
        head_resource: 'ldp.resource.api_head',
        get: 'ldp.resource.api_get',
        post: 'ldp.resource.api_post',
        patch: 'ldp.resource.api_patch',
        put: 'ldp.resource.api_put',
        delete: 'ldp.resource.api_delete'
      };

  // Container aliases
  let aliases = {
    'GET /': [...middlewares, actions.list],
    'POST /': [...middlewares, actions.post],
    'HEAD /': actions.head_container ? [addContainerUriMiddleware(containerUri), actions.head_container] : undefined
  };

  // If this is not the root container, add resource aliases
  if (commonRouteConfig.path !== '/') {
    aliases = {
      ...aliases,
      'GET /:id': [...middlewares, actions.get],
      'PUT /:id': [...middlewares, actions.put],
      'PATCH /:id': [...middlewares, actions.patch],
      'DELETE /:id': [...middlewares, actions.delete],
      'HEAD /:id': actions.head_resource ? [addContainerUriMiddleware(containerUri), actions.head_resource] : undefined
    };
  }

  return [
    {
      authorization: false,
      authentication: true,
      aliases,
      ...commonRouteConfig
    }
  ];
}

module.exports = getContainerRoutes;
