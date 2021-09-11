const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
//Si no hay un objeto creado en el JSON da error, porque?
const { validationResult } = require("express-validator");

const controller = {
    login: (req, res) => {
        res.render("login");
    },
    loginForm: (req, res) => {
        let user = req.body;
        let errors = validationResult(req);
        console.log(errors.mapped());
        if (errors.isEmpty()) {
            return res.redirect("/products");
        } else {
            return res.render("login", { error: errors.mapped(), old: req.body });
        }
    },

    register: (req, res) => {
        res.render("register");
    },
    registerForm: (req, res) => {
        let newUser = req.body;
        let errors = validationResult(req);
        console.log(errors.mapped());
        console.log(newUser);
        if (errors.isEmpty()) {
            return res.render("register", { userDetail: newUser });
        } else {
            return res.render("register", {
                error: errors.mapped(),
                old: req.body,
            });
        }

        //CODIGO ANTERIOR
        /*let registerValidations = validationResult(req);
if (registerValidations.errors.length > 0) {    
console.log(registerValidations.errors);
return res.render("register", {
errors: registerValidations.errors.mapped(), //mapped transforma arrays en objetos literales.
});
} else {
users.push(newUser);
let usersJSON = JSON.stringify(users);
fs.writeFileSync(usersFilePath, usersJSON);
res.redirect("/products");
}
*/
    },
};

module.exports = controller;