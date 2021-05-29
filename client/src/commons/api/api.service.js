import axios from 'axios';
import { AuthTokenService as AuthTokenServiceModule} from '../authentication/auth-token.service';

const BASE_URL = '/api/v1';

class ApiServiceClass {
  constructor(AuthTokenService) {
    this.AuthTokenService = AuthTokenService;
  }

  call(config){
    return axios({ ...config, url: `${BASE_URL}${config.url}`, method: config.method || 'GET' }).then((result = {}) => result)
  }

  callAuth(config) {
    return this.AuthTokenService.getAuthToken()
      .then((token) => this.call({
        ...config,
        headers: { ...config.headers, token }
      }));
  }
};

export const ApiService = new ApiServiceClass(AuthTokenServiceModule);
