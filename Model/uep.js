const { Sequelize } = require('sequelize')
const db = require('./db');

const Ueps = db.define('ueps',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idUep:{
        type: Sequelize.INTEGER,
        allowNull: false
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
    qntBoxs:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    uepOpen: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: true
    },
    openingFor:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            }
        }
    }
});

Ueps.sync();

module.exports = Ueps;