const express = require("express");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../model/user");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(cookieParser());

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  userModel
    .findOne({ username })
    .then((userfound) => {
      bcrypt
        .compare(password, userfound.password)
        .then((result) => {
          const token = jwt.sign({ username }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });

          res
            .status(200)
            .json({ status: "success", token, username: userfound.username });

          userModel
            .findOneAndUpdate({ username }, { token: token })
            .then((result) => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((error) => {
      res.status(400).json({ status: "no user found" });
      console.log(error);
    });
});

module.exports = router;
