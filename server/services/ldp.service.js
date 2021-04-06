const { LdpService } = require('@semapps/ldp');
const ontologies = require('../ontologies');
const urlJoin = require('url-join');

module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: process.env.SEMAPPS_HOME_URL,
    ontologies,
    containers: [{
            path: '/organizations',
            acceptedTypes: ['pair:Organization'],
            dereference: ['pair:hasLocation/pair:hasPostalAddress', 'pair:organizationOfMembership'],
            disassembly: [{ path: 'pair:organizationOfMembership', container:  process.env.SEMAPPS_HOME_URL + 'membership-associations' }]
          }, '/projects', '/events', '/persons', '/themas', '/skills', '/places', '/files','/branchs','/membership-roles','/membership-associations'],
    defaultJsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
    defaultContainerOptions: {
      jsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
      allowAnonymousEdit: true,
      allowAnonymousDelete: true
    }
  }
};
