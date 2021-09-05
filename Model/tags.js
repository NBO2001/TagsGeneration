const { Sequelize } = require('sequelize')
const db = require('./db');

const Tags = db.define('tags', {
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
    sector: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [3,100]
            }
        }
    },
    client: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [1,100]
            }
        }
    },
    typeDoc: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [3,100]
            }
        }
    },
    keyOne: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [3,300]
            }
        }
    },
    keyTwo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Filder Empty",
                arg: true
            },
            len: {
                msg: "Tem que ter no minimo 3 caracters",
                args: [3,300]
            }
        }
    },
    dateStart:{
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    dateEnd:{
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    lastUpdate:{
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


Tags.sync();

module.exports = Tags;