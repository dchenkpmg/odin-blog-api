const { Router } = require("express");
const controller = require("../controllers/postController");
const router = Router();
const passport = require("passport");

// routes for post operations
router.get("/posts", controller.getPosts);
router.get("/post/:id", controller.getPostById);

module.exports = router;
