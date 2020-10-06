const appboy = require('@braze/web-sdk');

if (!window) {
  throw new Error('Global window object required!')
}

const wrapper = {
  __appboy: appboy,
  initialize: function(key, url, options) {

    if (!key || !url) {
      throw new Error('Missing key and url parameters!')
    }

    try {
      appboy.initialize(key, {
        baseUrl: url,
        enableLogging: options.debug,
      });

      if (options.externalId) {
        appboy.changeUser(options.externalId);
      }

      appboy.openSession();

      return true;
    } catch (error) {
      throw new Error('Error in initialization method! ' + error.message);
    }
  },

  getFeed: function () {
    try {
      return appboy.getCachedFeed();
    } catch (error) {
      throw new Error('Error in getFeed method! ' + error.message);
    }
  },

  changeUser: function () {
    try {
      return appboy.changeUser();
    } catch (error) {
      throw new Error('Error in changeUser method! ' + error.message);
    }
  },
}

window.brazeWrapper = wrapper;
