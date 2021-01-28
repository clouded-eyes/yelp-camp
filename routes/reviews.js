const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");
const catchAsync = require("../utilities/catchAsync");
// const ExpressError = require("../utilities/ExpressError");
// const Campground = require("../models/campground");
// const Review = require("../models/review");

const {
  isLoggedIn,
  isAuthor,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");

// ROUTES
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
