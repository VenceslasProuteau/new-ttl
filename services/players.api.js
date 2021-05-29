const callApi = require('./api');
const Player = require('../models/player.model');

const URL_PREFIX = '/stats/json/';

const getPlayersByTeam = (teamId) =>
  callApi({
    url: `${URL_PREFIX}Players/${teamId}`,
  }).then((players) => players.map((player) => new Player(player)));

module.exports = {
  getPlayersByTeam,
};
