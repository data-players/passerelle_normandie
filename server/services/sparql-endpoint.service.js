const { SparqlEndpointService } = require('@semapps/sparql-endpoint');

module.exports = SparqlEndpointService;

module.exports = {
  mixins: [SparqlEndpointService],
  settings: {
    defaultAccept: 'application/ld+json'
  }
};
