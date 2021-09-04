const { Sequelize  } = require('sequelize');
const db = require('./db');

const Boxs = db.define('boxs', {
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
    idBox: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "Filder empty",
                args: true
            },
            len: [1,10], 
        }
    },
    boxOpen: {
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
})