const { LdpService } = require('@semapps/ldp');
const ontologies = require('../ontologies');
const urlJoin = require('url-join');

console.log('------------------------------------------------------------------ SERVICE LDP START');

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
          },{
              path: '/persons',
              acceptedTypes: ['pair:Person'],
              dereference: ['pair:hasLocation/pair:hasPostalAddress', 'pair:actorOfMembership'],
              disassembly: [{ path: 'pair:actorOfMembership', container:  process.env.SEMAPPS_HOME_URL + 'membership-associations' }]
          },{
            path: '/pages'
          },{
            path: '/projects',
            dereference: ['pair:hasLocation/pair:hasPostalAddress', 'pair:organizationOfMembership'],
          },{
            path: '/events',
            dereference: ['pair:hasLocation/pair:hasPostalAddress', 'pair:organizationOfMembership'],
          }, '/themas', '/skills', '/places', '/files','/membership-roles','/membership-associations','/Page', '/sectors'],
    // defaultJsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
    defaultContainerOptions: {
      jsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
      allowAnonymousEdit: true,
      allowAnonymousDelete: true
    }
  }
};
