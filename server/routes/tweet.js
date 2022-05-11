const express = require("express");
const checkauth = require("../middleware/checkauth");
const tweetModel = require("../model/tweets");
const userModel = require("../model/user");
const router = express.Router();

//POST

router.post("/tweeting/:usernameTweet", checkauth, (req, res) => {
  const headerToken = req.headers.authorization.split(" ")[1];
  const tweet = req.body.tweet;
  const username = req.params.usernameTweet;
  let date = new Date();

  userModel
    .findOne({ username }, "token")
    .then((result) => {
      const foundToken = result.token;

      if (foundToken !== headerToken) {
        res.status(401).json({
          status: "failed",
          msg: "Bearer do not match Hence Can's Save Tweet",
        });
        return;
      }

      tweetModel
        .findOneAndUpdate(
          { username },
          {
            $addToSet: {
              tweet,
              date,
            },
          }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET

router.get("/tweeting/:usernameTweet", (req, res) => {
  const username = req.params.usernameTweet;

  const headerToken = req.headers.authorization.split(" ")[1];

  userModel
    .findOne({ username }, "token")
    .then((result) => {
      const foundToken = result.token;

      if (headerToken !== foundToken) {
        console.log("tokens don't match");
        return;
      }

      userModel
        .findOne({ username }, "bio country")
        .then((result) => {
          tweetModel
            .findOne({ username }, "tweet date")
            .then((user) => {
              res.status(200).json({
                bio: result.bio,
                country: result.country,
                tweet: user.tweet,
                date: user.date,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
