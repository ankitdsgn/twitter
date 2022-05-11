const express = require("express");
const userModel = require("../model/user");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/protectedauth/:username", (req, res) => {
  const username = req.params.username;
  const protectedToken = req.headers.authorization.split(" ")[1];

  if (!protectedToken) {
    res.json({ status: "notoken" });
    return;
  }

  userModel
    .findOne({ username })
    .then((result) => {
      const databaseToken = result.token;

      if (protectedToken != databaseToken) {
        console.log("protectedToken is not equal to databaseToken");
        res.status(400).json({ status: "unsuccessful" });
        return;
      }

      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
