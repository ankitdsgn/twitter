const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  cpassword: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    required: false,
    type: String,
  },
  country: {
    required: false,
    type: String,
  },
  token: {
    required: false,
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
