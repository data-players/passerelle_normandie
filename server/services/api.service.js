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
    let path=sparqlRoutes[0].path;
    if (path.indexOf('/')===0){
      path= path.substring(1);
    }
    console.log(process.env.SEMAPPS_HOME_URL);
    console.log(new URL(process.env.SEMAPPS_HOME_URL).pathname);
    sparqlRoutes[0].path = new URL(process.env.SEMAPPS_HOME_URL).pathname +path;

    [
      ...(await this.broker.call('ldp.getApiRoutes')),
      ...sparqlRoutes,
    ].forEach(route => {
      console.log('route', route);
      this.addRoute(route);
    })

  }
};
