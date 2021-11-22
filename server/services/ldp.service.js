const { LdpService } = require('@semapps/ldp');
const ontologies = require('../ontologies');
const urlJoin = require('url-join');

module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: process.env.SEMAPPS_HOME_URL,
    ontologies,
    containers: [
          {
            path: '/'
          },
          {
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
          },
          {
            path: '/sectors'
          }
          , '/themas', '/skills', '/places', '/files','/membership-roles','/membership-associations','/Page'],
    // defaultJsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
    defaultContainerOptions: {
      jsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
      allowAnonymousEdit: true,
      allowAnonymousDelete: true
    }
  }
};
