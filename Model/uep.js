const { Sequelize } = require('sequelize')
const db = require('./db');

const Ueps = db.define('ueps',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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

Ueps.sync();

module.exports = Ueps;