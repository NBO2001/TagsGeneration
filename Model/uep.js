const { Sequelize } = require('sequelize')
const db = require('./db');

const Ueps = db.define('ueps',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    uep: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [3,30]
            }
        }
    },
    qntBoxs:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    uepOpen: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "Filder empty",
                args: true
            }
        }
    },
    openingFor:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [3,30]
            }
        }
    }
});