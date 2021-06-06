const {
  signUp,
  logIn,
} = require('./authentication');

const {
  getUser,
} = require('./user');

const {
  createTeam,
  get,
} = require('./team');

module.exports = {
  signUp,
  logIn,
  getUser,
  createTeam,
  get,
};