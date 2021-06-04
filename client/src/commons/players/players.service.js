import _ from 'lodash';
import { DataStore } from 'commons/data-store/data-store.model';
import { getPlayers } from './players.api';

function PlayersServiceMethod() {
  const store = new DataStore('PLAYERS');

  return {
    get(teamId) {
      const storedPlayers = _.get(store.get().players, teamId);

      return storedPlayers
        ? Promise.resolve(storedPlayers) 
        : getPlayers(teamId)
            .then(players => {
              store.set({
                players: { [teamId]: players },
              });
              return players;
            });
    },
  }
};

export const PlayersService = new PlayersServiceMethod();