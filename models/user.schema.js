const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  team: {
    name: {
      type: String,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: 'team'
    }
  }
});

module.exports = mongoose.model("user", UserSchema);