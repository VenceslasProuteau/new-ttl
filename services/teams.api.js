const callApi = require('./api');
const Team = require('../models/team.model');

const URL_PREFIX = '/scores/json/';
let store = [];

const getTeamById = (teamId, teams) => teams.find(({ id }) => id === teamId);

const getTeamDetails = (teamId) => {
  if (store.length > 0) {
    return getTeamById(teamId, store);
  }
  return callApi({
    url: `${URL_PREFIX}AllTeams`,
  }).then((data) => {
    const teams = data.map((team) => new Team(team));
    store = teams;
    return getTeamById(teamId, teams);
  })
}

module.exports = {
  getTeamDetails,
};
