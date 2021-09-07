const cacher = process.env.SEMAPPS_REDIS_URL
  ? {
    type: 'Redis',
    options: {
      prefix: 'action',
      ttl: 2592000, // Keep in cache for one month
      redis: process.env.SEMAPPS_REDIS_URL
    }
  }
  : undefined;


module.exports = {
  cacher
};
