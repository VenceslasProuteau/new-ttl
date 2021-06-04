const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("team", TeamSchema);