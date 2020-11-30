const { WebIdService } = require('@semapps/webid');

module.exports = {
  mixins: [WebIdService],
  settings: {
    usersContainer: process.env.SEMAPPS_HOME_URL + 'persons'
  }
};
