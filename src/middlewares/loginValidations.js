const { body } = require("express-validator");

const loginValidations = [
    body("username").notEmpty().withMessage("Ingresa tu usuario"),
    body("password").notEmpty().withMessage("Ingresa tu contraseña"),
];

module.exports = loginValidations