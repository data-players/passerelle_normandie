const ApiGatewayService = require('moleculer-web');
const { OidcConnector } = require('@semapps/connector');
const { MIME_TYPES } = require('@semapps/mime-types');
const path = require('path');
const urlJoin = require('url-join');
const {
  Routes: SparqlEndpointRoutes
} = require('@semapps/sparql-endpoint');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    routes: [
      {
        path: new URL(process.env.SEMAPPS_HOME_URL).pathname +'context.json',
        use: [
          ApiGatewayService.serveStatic('./public/context.json', {
            setHeaders: res => {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'application/ld+json; charset=utf-8');
            }
          })
        ]
      }
    ],
    cors: {
      origin: '*',
      exposedHeaders: '*'
    }
  },
  dependencies: [
    'fuseki-admin',
    'ldp',
    'sparqlEndpoint',
    'webid',
  ],
  async started() {
    this.connector = new OidcConnector({
      issuer: process.env.SEMAPPS_OIDC_ISSUER,
      clientId: process.env.SEMAPPS_OIDC_CLIENT_ID,
      clientSecret: process.env.SEMAPPS_OIDC_CLIENT_SECRET,
      redirectUri: process.env.SEMAPPS_HOME_URL + 'auth',
      privateKeyPath: path.resolve(__dirname, '../jwt/jwtRS256.key'),
      publicKeyPath: path.resolve(__dirname, '../jwt/jwtRS256.key.pub'),
      selectProfileData: authData => {
        // transform authData into Foaf Data
        return  {
          email: authData.email,
          name: authData.given_name,
          familyName: authData.family_name
        }
      },
      findOrCreateProfile: async profileData => {
        //find foaf WebId
        let webId = await this.broker.call('webid.findByEmail', {
          email: profileData.email
        });


        if (!webId) {
          //create Foaf WebId if not exist
          webId = await this.broker.call('webid.create', profileData);

          // Adds PAIR data to Foaf WebId
          await this.broker.call('ldp.resource.patch', {
            resource: {
              '@context': urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
              '@id': webId,
              '@type': ['pair:Person', 'foaf:Person'],
              'pair:firstName': profileData.name,
              'pair:lastName': profileData.familyName,
              'pair:e-mail': profileData.email
            },
            contentType: MIME_TYPES.JSON
          });
        }

        return webId;
      }
    });

    await this.connector.initialize();



    const connectorRoute = this.connector.getRoute();

    let pathRoute = connectorRoute.path||'';
    if (pathRoute.indexOf('/')===0){
      pathRoute= pathRoute.substring(1);
    }
    connectorRoute.path=  new URL(process.env.SEMAPPS_HOME_URL).pathname +pathRoute;


    const sparqlRoutes = await this.broker.call('sparqlEndpoint.getApiRoutes');
    let sparqlPath=sparqlRoutes[0].path;
    if (sparqlPath.indexOf('/')===0){
      sparqlPath= sparqlPath.substring(1);
    }
    // console.log(process.env.SEMAPPS_HOME_URL);
    // console.log(new URL(process.env.SEMAPPS_HOME_URL).pathname);
    sparqlRoutes[0].path = new URL(process.env.SEMAPPS_HOME_URL).pathname +sparqlPath;


    [
      connectorRoute,
      ...(await this.broker.call('ldp.getApiRoutes')),
      ...sparqlRoutes,
    ].forEach(route => {
      // console.log('route', route);
      this.addRoute(route);
    })

  },
  methods: {
    authenticate(ctx, route, req, res) {
      return this.connector.authenticate(ctx, route, req, res);
    },
    authorize(ctx, route, req, res) {
      return this.connector.authorize(ctx, route, req, res);
    }
  }
};
