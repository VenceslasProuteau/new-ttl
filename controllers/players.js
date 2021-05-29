const { getPlayersByTeam } = require('../services/players.api');

const getPlayers = (req, res) => {
  const { teamId } = req.params;
  getPlayersByTeam(teamId)
    .then(players => res.status(200).json(players))
}

module.exports = {
  getPlayers,
};