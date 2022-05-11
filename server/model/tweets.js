const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  tweet: [String],
  username: {
    required: false,
    type: String,
  },
  email: {
    required: false,
    type: String,
  },
  date: [Date],
});

const tweetModel = mongoose.model("tweet", tweetSchema);

module.exports = tweetModel;
