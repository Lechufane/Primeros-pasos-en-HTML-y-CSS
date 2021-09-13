const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validationReg = require("../middlewares/registerValidations");
const validationLog = require("../middlewares/loginValidations");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validationLog, usersController.loginForm);

router.get("/register", guestMiddleware, usersController.register);
router.post("/register", validationReg, usersController.registerForm);

router.get("/profile", authMiddleware, usersController.profile);

module.exports = router;