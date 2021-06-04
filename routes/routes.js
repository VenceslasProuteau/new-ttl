const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');
const { signUpValidators, loginValidators } = require('../validators/authentication');
const auth = require('../middleware/auth');
const {
  getSchedule,
} = require('../controllers/schedule');

const {
  getPlayers
} = require('../controllers/players');

router.post('/user/signup', signUpValidators, controllers.signUp);
router.post('/user/login', loginValidators, controllers.logIn);
router.get('/user/me', auth, controllers.getUser);

router.post('/team/create', auth, controllers.createTeam);

router.get('/schedule/:date', getSchedule);
router.get('/players/:teamId', getPlayers);

module.exports = router;