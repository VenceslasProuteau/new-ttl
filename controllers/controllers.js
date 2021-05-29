const {
  signUp,
  logIn,
} = require('./authentication');

const {
  getUser,
} = require('./user');

module.exports = {
  signUp,
  logIn,
  getUser,
};