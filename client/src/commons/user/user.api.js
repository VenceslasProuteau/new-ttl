import { ApiService as ApiServiceModule} from '../api/api.service';

function UserApiMethod(ApiService) {
  return {
    getSelfUser() {
      return ApiService.callAuth({
        method: 'GET',
        url: '/user/me',
      });
    }
  }
};

export const UserApi = new UserApiMethod(ApiServiceModule);
