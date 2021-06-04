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
          user.team = name;

          return team.save()
            .then(() => user.save()
              .then(() => res.json(team)))
            .catch((e) => console.log('err', e) || res.status(500).send({
              error: 'TECHNICAL_ERROR'
            }));
        });
    }).catch((e) => console.log('e', e) || res.send({ message: "Error in Fetching user" }));
};

module.exports = {
  createTeam,
}
