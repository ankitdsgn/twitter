const express = require("express");
const userModel = require("../model/user");
const tweetModel = require("../model/tweets");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/signup", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    password: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(30)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: Joi.ref("password"),
  });

  const result = schema.validate({
    email,
    username,
    password,
    cpassword,
  });

  if (result.error) {
    res.json({ msg: "validation failed" });
    return;
  }

  // Joi validation successful

  userModel.findOne({ email: email }).then((found) => {
    if (found) {
      res.status(400).json({ msg: "Email already registered" });
    } else {
      const newUser = new userModel({
        email,
        username,
        password,
        cpassword,
      });

      bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.cpassword = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });

      const newTweet = new tweetModel({
        username: username,
        email: email,
      });

      newTweet
        .save()
        .then((result) => {
          res.status(200);
        })
        .catch((err) => {
          res.status(400);
          console.log(err);
        });
    }
  });
});

module.exports = router;
