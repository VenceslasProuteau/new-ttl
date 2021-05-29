const callApi = require('./api');
const Game = require('../models/game.model');
const { getTeamDetails } = require('./teams.api');

const URL_PREFIX = '/scores/json/';

const getGamesByDate = (date) =>
  callApi({
    url: `${URL_PREFIX}GamesByDate/${date}`,
  }).then((games = []) => {
    const promises = games.map((game) => {
      const promise = [getTeamDetails(game.HomeTeamID), getTeamDetails(game.AwayTeamID)];
      return Promise.all(promise)
        .then(([homeTeam, awayTeam]) => new Game({game, homeTeam, awayTeam}));
    });

    return Promise.all(promises)
      .then((games) => games);
  });

module.exports = {
  getGamesByDate,
};
