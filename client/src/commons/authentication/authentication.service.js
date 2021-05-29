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


class AuthServiceClass {
  constructor(AuthApi) {
    this.AuthApi = AuthApi;
    this.store = new ClientStore();
  }

  getDomain(){
    window.location.hostname.split('.').slice(-2).join('.');
  }

  logout() {
    const domain = this.getDomain();
    Cookies.remove(AUTH_TOKEN, { domain });
    this.store.reset();
  }

  login(data) {
    return this.AuthApi.login(data)
      .then(({ data: { token } } = {}) => {
        Cookies.set(AUTH_TOKEN, token, {
          expires: 30,
          domain: this.getDomain(),
        });
      });
  }

  signUp(data) {
    return this.AuthApi.signUp(data)
      .then(() => this.login(data));
  }

  isAuthenticated() {
    return !!Cookies.get(AUTH_TOKEN)
  }
}

export const AuthService = new AuthServiceClass(AuthApiModule);
