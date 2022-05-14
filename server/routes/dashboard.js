const express = require("express");
const checkauth = require("../middleware/checkauth");
const userModel = require("../model/user");
const router = express.Router();
router.use(express.json());

router.get("/dashboard", (req, res) => {
  userModel
    .find({}, "username email bio country")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
