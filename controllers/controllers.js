const {
  signUp,
  logIn,
} = require('./authentication');

const {
  getUser,
} = require('./user');

const {
  createTeam,
} = require('./team');

module.exports = {
  signUp,
  logIn,
  getUser,
  createTeam,
};