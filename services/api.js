const axios = require('axios');

const callApi = (config) => {
  config.method = config.method || 'GET';
  config.headers = {
    "Ocp-Apim-Subscription-Key": process.env.KEY,
  };
  config.url = process.env.URL + config.url;

  return axios(config).then((result = {}) => result.data);
}

module.exports = callApi;