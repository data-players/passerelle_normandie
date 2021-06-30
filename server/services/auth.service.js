const urlJoin = require('url-join');
const path = require('path');
const { AuthService } = require('@semapps/auth');
const { MIME_TYPES } = require('@semapps/mime-types');
// const CONFIG = require('../config');

module.exports = {
  mixins: [AuthService],
  settings: {
    baseUrl: process.env.SEMAPPS_HOME_URL,
    jwtPath: path.resolve(__dirname, '../jwt'),
    oidc: {
      issuer: process.env.SEMAPPS_OIDC_ISSUER,
      clientId: process.env.SEMAPPS_OIDC_CLIENT_ID,
      clientSecret: process.env.SEMAPPS_OIDC_CLIENT_SECRET
    },
    selectProfileData: authData => ({
      email: authData.email,
      name: authData.given_name,
      familyName: authData.family_name
    })
  },
  events: {
    async 'auth.registered'(ctx) {
      const { webId, profileData } = ctx.params;

      await ctx.call(
        'ldp.resource.patch',
        {
          resource: {
            '@context': urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
            '@id': webId,
            '@type': ['pair:Person', 'foaf:Person', 'Person'],
            'pair:label': `${profileData.name} ${profileData.familyName.toUpperCase()}`,
            'pair:firstName': profileData.name,
            'pair:lastName': profileData.familyName,
            'pair:e-mail': profileData.email
          },
          contentType: MIME_TYPES.JSON
        },
        { meta: { webId: 'system' } }
      );
    }
  }
};
