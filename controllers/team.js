const User = require("../models/user.schema");
const Team = require("../models/team.schema");

const createTeam = (req, res) => {
  return User.findById(req.user.id)
    .then((user) => {
      const { name } = req.body;
      return Team.findOne({ name })
        .then((isExistingTeam) => {
          if (isExistingTeam) {
            return res.status(400).json({
              error: 'TEAM_EXISTING'
            });
          }

          const team = new Team({ name, owner: user._id });
          team.users.push({ _id: user._id});
          user.team = { name, id: team._id };

          return team.save()
            .then(() => user.save()
              .then(() => res.json({ id: team.id })))
            .catch((e) => console.log('err', e) || res.status(500).send({
              error: 'TECHNICAL_ERROR'
            }));
        });
    }).catch((e) => console.log('e', e) || res.send({ message: "Error in Fetching user" }));
};

const get = (req, res) => {
  return User.findById(req.user.id)
    .then(() => {
      const { id } = req.params;
      return Team.findById(id)
        .then((team) => {
          return User.find({'team.id': req.params.id })
            .then((users) => {
              // TODO: create return model
              const teamUsers = users.map(({ username, id }) => ({
                id,
                username,
                isOwner: id == team.owner // TODO: better way to test equality ...
              }));
              const { name } = team;
              return res.json({
                name,
                users: teamUsers,
              });
            });
        }).catch(() => res.status(500).send({
          error: 'TECHNICAL_ERROR',
        }))
    }).catch((e) => console.log('e', e) || res.send({ message: "Error in Fetching user" }));
}

module.exports = {
  createTeam,
  get,
}
