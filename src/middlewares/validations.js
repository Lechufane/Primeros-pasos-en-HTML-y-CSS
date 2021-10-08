const { body } = require("express-validator");

const validations = {

    register:  [
    body("name").notEmpty().withMessage("Debes completar el campo con tu nombre"),
    body("username")
    .notEmpty()
    .withMessage("Debes completar el campo con tu nombre de usuario")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Nombre de usuario demasiado corto"),
    body("email")
    .notEmpty()
    .withMessage("Debes completar el campo con tu email")
    .bail()
    .isEmail()
    .withMessage("debes completar el campo con un email valido"),
    body("password")
    .notEmpty()
    .withMessage("Debes completar el campo con una contraseña")
    .bail()
    .isLength({ min: 6, max: 20 })
    .withMessage(
        "La contraseña debe tener un minimo de 6 caracteres y un maximo de 12"
    ),
],

 login: [
    body("username").notEmpty().withMessage("Ingresa tu usuario"),
    body("password").notEmpty().withMessage("Ingresa tu contraseña"),
]

}


module.exports = validations;