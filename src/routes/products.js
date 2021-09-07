// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productsController = require("../controllers/productsController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, "../../public/images/products");
        cb(null, folder);
    },

    filename: (req, file, cb) => {
        let newFileName = "product-" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    },
});
const upload = multer({ storage: storage });

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index); //Usa la ruta / porque esta definido como /products en app

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post("/create", upload.single("image"), productsController.store);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get("/detail/:id/edit", productsController.edit);
router.put("/detail/:id", upload.single("image"), productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete("/detail/:id", productsController.delete);

module.exports = router;