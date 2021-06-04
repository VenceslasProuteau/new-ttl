import { UserApi as UserApiModule} from './user.api';
import { DataStore } from '../data-store/data-store.model';

function UserServiceMethod(UserApi) {
  const store = new DataStore('SELF_USER');
  return {
    getSelfUser() {
      const user = store.get().user;
      return user ? Promise.resolve(user) : UserApi.getSelfUser()
        .then((user) => {
          console.log('user', user);
          store.set({ user });
          return user;
        });
    }
  }
};

export const UserService = new UserServiceMethod(UserApiModule);
