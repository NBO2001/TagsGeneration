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
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
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
    idSector: {
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
})


Boxs.sync();

module.exports = Boxs;