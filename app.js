const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Servidor iniciado en ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(path.join("./views/index.html")));
});

app.get("/login", (req, res) => {
    res.sendFile(path.resolve(path.join("./views/login.html")));
});

app.get("/create-product", (req, res) => {
    res.sendFile(path.resolve(path.join("./views/create-product.html")));
});