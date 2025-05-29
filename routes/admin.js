const { Router } = require("express");
const controller = require("../controllers/adminController");
const router = Router();
const passport = require("passport");

router.post("/login", controller.adminLogin);
router.post("/register", controller.adminRegister);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({
      status: "success",
      message: "You have accessed a protected route",
    });
  },
);

module.exports = router;
