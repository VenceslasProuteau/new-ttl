import Cookies from 'js-cookie';
const AUTH_TOKEN = 'authToken';

class AuthTokenClass {
  getAuthToken() {
    return Cookies.get(AUTH_TOKEN)
  }
}

export const AuthTokenService = new AuthTokenClass();
