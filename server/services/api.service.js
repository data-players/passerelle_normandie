const ApiGatewayService = require('moleculer-web');
// const { OidcConnector } = require('@semapps/connector');
const { MIME_TYPES } = require('@semapps/mime-types');
const path = require('path');
const urlJoin = require('url-join');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      exposedHeaders: '*'
    },
    requestTimeout:99
  },
  methods: {
    authenticate(ctx, route, req, res) {
      return ctx.call('auth.authenticate', { route, req, res });
    },
    authorize(ctx, route, req, res) {
      return ctx.call('auth.authorize', { route, req, res });
    }
  }

};
