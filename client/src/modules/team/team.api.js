import { ApiService as ApiServiceModule } from 'commons/api/api.service';

function TeamApiMethod(ApiService) {
  return {
    create(data) {
      return ApiService.callAuth({
        method: 'POST',
        url: '/team/create',
        data
      });
    },
    get(teamId) {
      return ApiService.callAuth({
        method: 'GET',
        url: `/team/${teamId}`,
      });
    }
  };
}

export const TeamApi = new TeamApiMethod(ApiServiceModule);