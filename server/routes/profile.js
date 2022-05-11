const express = require("express");
const checkauth = require("../middleware/checkauth");
const jwt = require("jsonwebtoken");
const router = express.Router();
router.use(express.json());

// MODELS
const userModel = require("../model/user");

// POST REQUEST
router.post("/profile/:id", checkauth, (req, res) => {
  const username = req.params.id;
  const bio = req.body.bio;
  const country = req.body.country;

  const headerToken = req.headers.authorization.split(" ")[1];

  userModel
    .findOne({ username }, "token")
    .then((result) => {
      const foundToken = result.token;

      //VERY IMPORTANT FOR VERIFYING CLIENT TOKEN WITH THE STORAGE TOKEN

      if (headerToken !== foundToken) {
        res.status(401).json({ status: "failed", msg: "Bearer do not match" });

        return;
      }

      userModel
        .findOneAndUpdate(
          { username: username },
          { bio: bio, country: country }
        )
        .then((result) => res.status(200).json({ status: "changes updated" }))
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET REQUEST

module.exports = router;
