import { ApiService } from 'commons/api/api.service';

const getSchedule = (date) => {
  return ApiService.call({
    url: `/schedule/${date}`,
  }).then(({ data }) => data)
    .catch(e => e);
};

export {
  getSchedule,
};
