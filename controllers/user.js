const User = require("../models/user.schema");

const getUser = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id).select('username email team')
    console.log('USER', user);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

module.exports = {
  getUser,
}