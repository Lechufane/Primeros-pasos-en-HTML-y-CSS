const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req, res) => {
        let visitados = products.filter((i) => i.category === "visited");
        let ofertas = products.filter((i) => i.category === "in-sale");
        res.render("index", {
            productosVisitados: visitados,
            productosOfertas: ofertas,
        });
    },
    search: (req, res) => {
        let search = req.query.keywords;
        let product = products;
        let productSearch = [];
        for (let i = 0; i < product.length; i++) {
            if (product[i].name.includes(search)) {
                productSearch.push(products[i]);
            }
        }
        res.render("results", { all: productSearch, search: search });
    },
    offers: (req, res) => {
        let all = products;
        let offers = all.filter((i) => i.category == "in-sale");
        res.render("offers", { all: offers });
    },
};

module.exports = controller;