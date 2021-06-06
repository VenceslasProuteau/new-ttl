import { UserApi as UserApiModule} from './user.api';
import { DataStore } from '../data-store/data-store.model';

function UserServiceMethod(UserApi) {
  const store = new DataStore('SELF_USER');
  return {
    getSelfUser() {
      const user = store.get().user;
      return user ? Promise.resolve(user) : UserApi.getSelfUser()
        .then(({ data } = {}) => {
          store.set({ user: data }, true);
          return data;
        });
    },
    resetStore() {
      return store.reset();
    }
  }
};

export const UserService = new UserServiceMethod(UserApiModule);
