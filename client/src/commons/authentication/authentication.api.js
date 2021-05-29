import { ApiService as ApiServiceModule } from '../api/api.service';

class AuthApiClass {
  constructor(ApiService) {
    this.ApiService = ApiService;
  }

  login(data) {
    return this.ApiService.call({
      method: 'POST',
      url: '/user/login',
      data,
    });
  }

  signUp(data) {
    return this.ApiService.call({
      method: 'POST',
      url: '/user/signup',
      data,
    });
  }
}

export const AuthApi = new AuthApiClass(ApiServiceModule);
