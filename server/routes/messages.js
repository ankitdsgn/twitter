const express = require("express");
const router = express.Router();
const messagesModel = require("../model/messages");

router.post("/messages", (req, res) => {
  const { conversationId, sender, text } = req.body;
  const newMessage = messagesModel({
    conversationId,
    sender,
    text,
  });

  newMessage
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/messages/:conversationId", (req, res) => {
  messagesModel
    .find({ conversationId: req.params.conversationId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
