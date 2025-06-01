const { Router } = require("express");
const controller = require("../controllers/commentController");
const router = Router();
const passport = require("passport");

// // routes for comment operations
// router.get("/comments", controller.getComments);
// router.post("/comment", controller.createComment);

module.exports = router;
