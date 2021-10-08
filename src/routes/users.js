const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validations = require("../middlewares/validations");

router.get("/login", usersController.login);
router.post("/login", validations.login, usersController.loginForm);

router.get("/register", usersController.register);
router.post("/register", validations.register, usersController.registerForm);

router.get("/profile", usersController.profile);

module.exports = router;