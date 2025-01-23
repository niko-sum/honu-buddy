const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

// Comment routes
router.post(
  "/:spotId",
  ensureAuth,
  upload.array("images", 5),
  commentsController.createComment
);

router.post(
  "/like/:commentId", 
  ensureAuth, 
  commentsController.likeComment
);

router.post(
  "/delete/:commentId", 
  ensureAuth, 
  commentsController.deleteComment
);

module.exports = router; 