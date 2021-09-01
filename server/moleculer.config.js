const { CacherMiddleware } = require('@semapps/webacl');
//const CacherMiddleware= require('./cacher')

console.log("LOG ENV : ", process.env.SEMAPPS_REDIS_URL)

// Use the cacher only if Redis is configured
const cacherConfig =  {
  type: 'Redis',
  options: {
    prefix: 'action',
    ttl: 2592000, // Keep in cache for one month
    redis: process.env.SEMAPPS_REDIS_URL
  }
};

module.exports = {
  // You can set all ServiceBroker configurations here
  // See https://moleculer.services/docs/0.14/configuration.html
  middlewares: [
    CacherMiddleware(cacherConfig),
  ]
};
