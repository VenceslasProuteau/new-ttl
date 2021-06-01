import { ApiService as ApiServiceModule } from '../api/api.service';

function AuthApiMethod(ApiService) {
  return {
    login(data) {
      return ApiService.call({
        method: 'POST',
        url: '/user/login',
        data,
      });
    },
    signUp(data) {
      return ApiService.call({
        method: 'POST',
        url: '/user/signup',
        data,
      });
    } 
  }
}

export const AuthApi = new AuthApiMethod(ApiServiceModule);
