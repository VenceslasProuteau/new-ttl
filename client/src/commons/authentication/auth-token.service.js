import Cookies from 'js-cookie';
const AUTH_TOKEN = 'authToken';

function AuthTokenMethod() {
  return {
    getAuthToken() {
      return Cookies.get(AUTH_TOKEN)
    }
  }
}

export const AuthTokenService = new AuthTokenMethod();
