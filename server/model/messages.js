const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messagesSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const messagesModel = mongoose.model("messages", messagesSchema);

module.exports = messagesModel;
