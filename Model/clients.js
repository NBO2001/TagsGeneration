const { Sequelize } = require('sequelize')
const db = require('./db');

const Clients = db.define('clients', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            }
        }
    },
})

Clients.sync()

module.exports = Clients