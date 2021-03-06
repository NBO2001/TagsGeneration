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
        unique: true,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            }
        }
    },
    clientName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    logoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
})

Clients.sync()

module.exports = Clients