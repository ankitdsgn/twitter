const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    senderUsername: {
      type: String,
    },
    receiverUsername: {
      type: String,
    },
  },
  { timestamps: true }
);

const conversationsModel = mongoose.model("conversation", conversationSchema);

module.exports = conversationsModel;
