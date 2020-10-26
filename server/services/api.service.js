const ApiGatewayService = require('moleculer-web');
const {
  Routes: SparqlEndpointRoutes
} = require('@semapps/sparql-endpoint');

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
    'fuseki-admin',
    'ldp',
    'sparqlEndpoint',
  ],
  async started() {
    const sparqlRoutes = await this.broker.call('sparqlEndpoint.getApiRoutes');
    sparqlRoutes.path = new URL(process.env.SEMAPPS_HOME_URL).pathname + sparqlRoutes.path;

    [
      ...(await this.broker.call('ldp.getApiRoutes')),
      ...sparqlRoutes,
    ].forEach(route => {
      console.log('route', route);
      this.addRoute(route);
    })

  }
};
