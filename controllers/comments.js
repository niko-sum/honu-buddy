const Comment = require("../models/Comment");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  createComment: async (req, res) => {
    try {
      if (!req.body.text) {
        return res.redirect(`/spots/${req.params.spotId}`);
      }

      let imageData = [];
      if (req.files?.length > 0) {
        imageData = await Promise.all(
          req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return {
              url: result.secure_url,
              cloudinaryId: result.public_id
            };
          })
        );
      }

      await Comment.create({
        text: req.body.text,
        likes: 0,
        user: req.user.id,
        post: req.params.spotId,
        images: imageData
      });

      return res.redirect(`/spots/${req.params.spotId}`);
    } catch (err) {
      console.error("Error in createComment:", err);
      return res.redirect(`/spots/${req.params.spotId}`);
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      comment.likes += 1;
      await comment.save();
      res.redirect(req.get("Referrer") || "/");
    } catch (err) {
      console.error("Error liking comment:", err);
      res.redirect(req.get("Referrer") || "/");
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findOne({ 
        _id: req.params.commentId, 
        user: req.user.id 
      });

      if (comment?.images?.length > 0) {
        await Promise.all(
          comment.images.map(image => 
            cloudinary.uploader.destroy(image.cloudinaryId)
          )
        );
      }

      await Comment.deleteOne({ _id: req.params.commentId, user: req.user.id });
      res.redirect(req.get("Referrer") || "/");
    } catch (err) {
      console.error("Error deleting comment:", err);
      res.redirect(req.get("Referrer") || "/");
    }
  },
};
