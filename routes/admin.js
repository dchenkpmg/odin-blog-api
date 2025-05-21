const { Router } = require("express");
const controller = require("../controllers/adminController");
const router = Router();

router.post("/login", controller.adminLogin);
router.post("/register", controller.adminRegister);

module.exports = router;
