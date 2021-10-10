const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const controller = {
    register: (req, res) => {
        res.render("register");
    },

    registerForm: (req, res) => {
        let resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("register", {
                error: resultValidation.mapped(),
                old: req.body,
            });
        }
        let sameUser = User.findByField("email", req.body.email);

        if (sameUser) {
            return res.render("register", {
                error: {
                    email: {
                        msg: "este usuario ya esta registrado",
                    },
                },
                old: req.body,
            });
        }

        let newUser = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        };

        User.create(newUser);
        return res.redirect("/users/login");
    },

    login: (req, res) => {
        res.render("login");
    },

    loginForm: (req, res) => {
        //validar errores
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("login", {
                error: resultValidation.mapped(),
                old: req.body,
            });
        }
        //comparar los datos enviados con la base de datos (por ahora json), recordar bcrypt.compareSync
        let user = User.findByField("username", req.body.username);
        if (user) {
            //comparamos contraseñas
            let passOK = bcrypt.compareSync(req.body.password, user.password);
            if (passOK) {
                req.session.userLogged = user;
                delete user.password;
                //definimos las cookies y redirigimos al perfil
                if (req.body.remember_me != undefined) {
                    res.cookie("recordame", user.id, { maxAge: 60000 });
                }
                console.log(req.cookies.recordame);

                return res.redirect("/users/profile");
            } else {
                return res.render("login", {
                    error: {
                        password: {
                            msg: "Credenciales invalidas",
                        },
                    },
                });
            }
        }
        return res.render("login", {
            error: {
                username: {
                    msg: "Usuario no registrado",
                },
            },
        });
    },
    profile: function(req, res) {
        let user = req.session.userLogged;
        res.render("profile", { user: user });
    },
};

module.exports = controller;