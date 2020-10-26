const ApiGatewayService = require('moleculer-web');
const { Routes: SparqlEndpointRoutes } = require('@semapps/sparql-endpoint');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    routes: [],
    cors: {
      origin: '*',
      exposedHeaders: '*'
    }
  },
  dependencies: [
    'ldp',
    'sparqlEndpoint',
  ],
  async started() {
    [
      ...(await this.broker.call('ldp.getApiRoutes')),
      ...(await this.broker.call('sparqlEndpoint.getApiRoutes')),
    ].forEach(route => this.addRoute(route));
  }
};
