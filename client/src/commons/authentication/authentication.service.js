import Cookies from 'js-cookie';
import { UserService } from '../user/user.service';
import { AuthApi as AuthApiModule } from './authentication.api';

const AUTH_TOKEN = 'authToken';

class ClientStore {
  constructor() {
    this.clientCache = {};
  }

  get() {
    return this.clientCache;
  }

  set(data = {}) {
    this.clientCache = { ...this.clientCache, ...data };
  }

  reset() {
    this.clientCache = {};
  }
}


function AuthServiceMethod(AuthApi) {
  const store = new ClientStore();

  return {
    getDomain(){
      window.location.hostname.split('.').slice(-2).join('.');
    },
    logout() {
      UserService.resetStore();
      Cookies.remove(AUTH_TOKEN, { domain: this.getDomain() });
      store.reset();
    },
    login(data) {
      UserService.resetStore();
      return AuthApi.login(data)
        .then(({ data: { token } } = {}) => {
          Cookies.set(AUTH_TOKEN, token, {
            expires: 30,
            domain: this.getDomain(),
          });
        }).catch(({ response: { data } } = {}) => Promise.reject(data))
    },
    signUp(data) {
      return AuthApi.signUp(data)
        .catch(({ response: { data } } = {}) => Promise.reject(data))
    },
    isAuthenticated() {
      return !!Cookies.get(AUTH_TOKEN)
    }
  }
}

export const AuthService = new AuthServiceMethod(AuthApiModule);
