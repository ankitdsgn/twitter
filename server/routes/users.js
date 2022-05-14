const express = require("express");
const router = express.Router();
const userModel = require("../model/user");

router.get("/users", (req, res) => {
  const username = req.query.username;

  userModel
    .find({ username }, "username email country")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
