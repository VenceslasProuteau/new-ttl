import { TeamApi, TeamApi as TeamApiModule } from './team.api';

function TeamServiceMethod(TeamApi) {
  return {
    create(data) {
      return TeamApi.create(data)
        .then(({ data } = {}) => data);
    },
    get(teamId) {
      return TeamApi.get(teamId)
        .then(({ data } = {}) => data);
    }
  }
}
export const TeamService = new TeamServiceMethod(TeamApi);