import axios from 'axios';
import { AuthTokenService as AuthTokenServiceModule} from '../authentication/auth-token.service';

const BASE_URL = '/api/v1';

function ApiServiceMethod(AuthTokenService) {
  return {
    call(config){
      return axios({ ...config, url: `${BASE_URL}${config.url}`, method: config.method || 'GET' })
        .then((result = {}) => result);
    },
    callAuth(config) {
      const token = AuthTokenService.getAuthToken();
      if (!token) {
        return Promise.reject({ reason: 'NOT_AUTHENTICATED'});
      }
      return this.call({
        ...config,
        headers: { ...config.headers, token }
      });
    }
  }
};

export const ApiService = new ApiServiceMethod(AuthTokenServiceModule);
