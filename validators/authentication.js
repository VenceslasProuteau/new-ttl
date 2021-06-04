const { check } = require("express-validator");

const signUpValidators = [
  check("username", "Please Enter a Valid Username")
  .not()
  .isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
];

const loginValidators = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
];

module.exports = {
  signUpValidators,
  loginValidators,
};
