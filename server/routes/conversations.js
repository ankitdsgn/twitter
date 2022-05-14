const express = require("express");
const router = express.Router();
const conversationsModel = require("../model/conversations");

//new conversation

router.post("/conversations", (req, res) => {
  const newConversation = new conversationsModel({
    senderUsername: req.body.senderUsername,
    receiverUsername: req.body.receiverUsername,
  });

  newConversation
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get conversation of a user

router.get("/conversations/:username", (req, res) => {
  conversationsModel
    .find({
      $or: [
        { senderUsername: req.params.username },
        { receiverUsername: req.params.username },
      ],
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
