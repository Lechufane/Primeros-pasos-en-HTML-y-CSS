const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(process.env.PORT || port, () => {
    console.log("Servidor iniciado");
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

app.get("/create-user", (req, res) => {
    res.sendFile(path.resolve(path.join("./views/create-user.html")));
});