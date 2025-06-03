const { Router } = require("express");
const controller = require("../controllers/postController");
const router = Router();
const passport = require("passport");

// routes for post operations
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  controller.getPosts,
);
router.get("/posts/public", controller.getPublicPosts);
router.get("/posts/:id", controller.getPostById);
router.get("/posts/:id/comments", controller.getCommentsByPostId);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  controller.addPost,
);
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  controller.editPost,
);
router.post(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deletePost,
);
router.post("/posts/:id/comments", controller.createComment);
router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteComment,
);

module.exports = router;
