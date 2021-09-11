const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validationReg = require("../middlewares/validation");
const validationLog = require("../middlewares/loginValidations");

router.get("/login", usersController.login);
router.post("/login", validationLog, usersController.loginForm);

router.get("/register", usersController.register);
router.post("/register", validationReg, usersController.registerForm);

module.exports = router;