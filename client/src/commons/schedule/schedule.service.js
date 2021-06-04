import _ from 'lodash';
import { DataStore } from 'commons/data-store/data-store.model';
import { getSchedule } from './schedule.api';

function ScheduleServiceMethod() {
  const store = new DataStore('SCHEDULE');

  return {
    getSchedule(date) {
      const storedDate = date.replace(/-/ig, '');
      const storedDateSchedule = _.get(store.get().schedule, storedDate);

      return storedDateSchedule
        ? Promise.resolve(storedDateSchedule) 
        : getSchedule(date)
            .then(schedule => {
              store.set({
                schedule: { [storedDate]: schedule },
              });
              return schedule;
            });
    },
  }
};

export const ScheduleService = new ScheduleServiceMethod();