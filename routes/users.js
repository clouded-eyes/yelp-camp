const express = require("express");
const router = express.Router();

const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");

const users = require("../controllers/users");
const User = require("../models/user");
const passport = require("passport");

// router.route('/register')
router
  .route("/register")
  .get(catchAsync(users.renderRegistration))
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
