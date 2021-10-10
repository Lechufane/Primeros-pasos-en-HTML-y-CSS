const User = require("../models/User");

function recordame(req, res, next) {
    if (req.cookies.recordame != undefined && req.session.userLogged == undefined) {
        let user = User.findByPk(res.cookies.recordame);
        req.session.userLogged = user;
    }
    next();
}

module.exports = recordame;