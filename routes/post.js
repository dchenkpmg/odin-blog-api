const { Router } = require("express");
const controller = require("../controllers/postController");
const router = Router();
const passport = require("passport");

// routes for post operations
router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPostById);
router.get("/posts/:id/comments", controller.getCommentsByPostId);
router.post("/posts", controller.addPost);
router.post("/edit/:id", controller.editPost);

module.exports = router;
