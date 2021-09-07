const { deepStrictEqual } = require("assert");
const { resolveSoa } = require("dns");
const { json } = require("express");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const { get } = require("../routes/main");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json"); //ruta absoluta del archivo de data.json
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); //archivo json transformado en objeto.

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Root - Show all products
    index: (req, res) => {
        //siempre empezamos leyendo el producto
        let productsJSON = fs.readFileSync(productsFilePath, "utf-8");
        //luego lo transformamos en un objeto para pasarlo a la vista(parseo)
        let allProducts = JSON.parse(productsJSON);
        //no hace falta pero reescribimos el json por las dudas
        fs.writeFileSync(productsFilePath, productsJSON);
        res.render("products", { all: allProducts }); //aca necesitamos pasarle como valor al objeto un objeto, no un archivo json
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        let productsJSON = fs.readFileSync(productsFilePath, "utf-8"); // primero lo leo
        let allProducts = JSON.parse(productsJSON); // despues lo parseo
        //defino lo que hace el metodo
        let id = req.params.id;
        let product = allProducts.find((i) => i.id == id);

        res.render("detail", { productDetail: product });
    },

    // Create - Form to create
    create: (req, res) => {
        res.render("product-create-form");
    },

    // Create -  Method to store
    store: (req, res) => {
        let productsJSON = fs.readFileSync(productsFilePath, "utf-8");
        let allProducts = JSON.parse(productsJSON);
        //definir el id del nuevo producto, con .length
        let id = allProducts.length + 1;
        //vincular los parametros por formulario a los parametros del nuevo objeto
        let product = {
            id: id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            image: req.file == undefined ? "default-image.png" : req.file.filename,
        };
        //subir el nuevo producto al array de productos con el .push();
        allProducts.push(product);
        //pasar el nuevo arreglo de productos a JSON
        productsJSON = JSON.stringify(allProducts);
        //escribir el nuevo archivo con el producto nuevo en la base de datos de json
        fs.writeFileSync(productsFilePath, productsJSON); // tener en cuenta que writeFileSync sobreescribe TODO.
        //redirigir
        res.redirect("/products/detail/" + id);
    },

    // Update - Form to edit
    edit: (req, res) => {
        let productsJSON = fs.readFileSync(productsFilePath, "utf8");
        let allProducts = JSON.parse(productsJSON);
        let id = req.params.id;
        let product = allProducts.find((i) => i.id == id);
        res.render("product-edit-form", { productDetail: product });
    },
    // Update - Method to update
    update: (req, res) => {
        let id = req.params.id;
        products.forEach((prod) => {
            if (prod.id == id) {
                prod.name = req.body.name || prod.name;
                prod.price = req.body.price || prod.price;
                prod.discount = req.body.discount || prod.discount;
                prod.category = req.body.category || prod.category;
                prod.description = req.body.description ?
                    req.body.description :
                    prod.description;
                prod.image = req.file == undefined ? prod.image : req.file.filename;
            }
        });
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect("/products/detail/" + id);
    },
    //Delete - Method to delete
    delete: (req, res) => {
        let productsJSON = fs.readFileSync(productsFilePath, "utf-8");
        let allProducts = JSON.parse(productsJSON);
        let id = req.params.id;

        /*gracias a la variable allProducts no necesito tocar el archivo JSON
ni el objeto en el que se covierte globalmente, 
sino trabajar con un scope local*/

        allProducts = allProducts.filter((prod) => prod.id != id);
        allProducts.forEach((prod, i) => {
            prod.id = i + 1;
        });

        productsJSON = JSON.stringify(allProducts);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect("/products");
    },
};

module.exports = controller;