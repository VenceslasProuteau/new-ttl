import Cookies from 'js-cookie';
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
      const domain = this.getDomain();
      Cookies.remove(AUTH_TOKEN, { domain });
      store.reset();
    },
    login(data) {
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
        .then(() => this.login(data));
    },
    isAuthenticated() {
      return !!Cookies.get(AUTH_TOKEN)
    }
  }
}

export const AuthService = new AuthServiceMethod(AuthApiModule);
