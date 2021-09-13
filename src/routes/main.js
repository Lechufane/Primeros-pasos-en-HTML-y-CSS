// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/search", mainController.search);
router.get("/offers", mainController.offers);

router.get("/prueba-session", function(req, res) {
    if (req.session.visitNumber == undefined) {
        req.session.visitNumber = 0;
    }
    req.session.visitNumber++;
    res.send("session tiene el numero " + req.session.visitNumber);
});

module.exports = router;