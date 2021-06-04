import { ApiService } from 'commons/api/api.service';

const getPlayers = (teamId) => {
  return ApiService.call({
    url: `/players/${teamId}`,
  }).then(({ data }) => data)
    .catch(e => e);
};

export {
  getPlayers,
};
