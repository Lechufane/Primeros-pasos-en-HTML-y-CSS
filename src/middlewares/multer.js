const multer = require("multer");
const path = require("path");

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

module.exports = upload;