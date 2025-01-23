const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const spotsController = require("../controllers/spots")
const commentsController = require("../controllers/comments");
const guideController = require("../controllers/snorkelguide");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const snorkelingSpots = require("../data/spots");
const fetchWeatherData = require("../util/fetchWeather");
const utils = require("../util/conversions");
const Comment = require("../models/Comment");
const upload = require("../middleware/multer");

// Main Routes - simplified for now
router.get("/", homeController.getHome);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/profile", ensureAuth, homeController.getProfile);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// Snorkeling Spots Routes
router.get("/spots/:spotId", spotsController.getSpot);

// Snorkeling Guide Route
router.get("/snorkelguide", guideController.getGuide);

// Comments Route
router.post(
  "/comments/:spotId", 
  ensureAuth, 
  upload.array('images', 5), // Allow up to 5 images
  commentsController.createComment
);
router.post("/comments/like/:commentId", ensureAuth, commentsController.likeComment);
router.post("/comments/delete/:commentId", ensureAuth, commentsController.deleteComment);

module.exports = router;