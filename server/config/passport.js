const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//user model
const userModel = require("../model/user");
const passport = require("passport");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, userModel.password, function (err, result) {
          if (err) throw err;

          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { msg: "password incorrect" });
          }
        });
      });
    })
  );
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});
