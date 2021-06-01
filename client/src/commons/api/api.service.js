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
      return AuthTokenService.getAuthToken()
        .then((token) => this.call({
          ...config,
          headers: { ...config.headers, token }
        }));
    }
  }
};

export const ApiService = new ApiServiceMethod(AuthTokenServiceModule);
