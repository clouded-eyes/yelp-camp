const express = require("express");
const router = express.Router();

const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utilities/catchAsync");
const { storage } = require("../cloudinary/index");
const multer = require("multer");
const upload = multer({ storage });

const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

// ROUTES
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("campground[images]"),
    validateCampground,
    catchAsync(campgrounds.create)
  );
// .post(upload.array("image"), (req, res) => {
//   console.log(req.body, req.files);
//   res.send("It Worked!");
// });

router.get("/new", isLoggedIn, campgrounds.renderCreatorForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.show))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("campground[images]"),
    validateCampground,
    catchAsync(campgrounds.edit)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
