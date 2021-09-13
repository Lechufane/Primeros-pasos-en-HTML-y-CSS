const fs = require("fs");
const path = require("path");
const { hostname } = require("os");
const { all } = require("../app");

const User = {
    fileName: path.resolve(path.join(__dirname, "../data/usersDataBase.json")),

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },
    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },
    findAll: function() {
        return this.getData();
    },
    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find((oneUser) => oneUser.id === id);
        return userFound;
    },
    //muchos errores con punta de flecha, usar funcion tradicional.
    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find((oneUser) => oneUser[field] === text);
        return userFound;
    },
    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData,
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ""));
        return newUser;
    },
    edit: function(id) {
        let allUsers = this.findAll();
    },
    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter((user) => user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ""));
        return true;
    },
};

module.exports = User;