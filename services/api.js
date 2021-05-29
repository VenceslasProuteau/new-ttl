const axios = require('axios');

const {
  url,
  key,
} = require('../config');

const callApi = (config) => {
  config.method = config.method || 'GET';
  config.headers = {
    "Ocp-Apim-Subscription-Key": key,
  };
  config.url = url + config.url;

  return axios(config).then((result = {}) => result.data);
}

module.exports = callApi;