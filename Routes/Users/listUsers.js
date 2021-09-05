const express = require('express');
const router = express.Router();

const Users = require('../../Model/users');

router.get('/:key', (req, res, next) => {
    
    Users.findAll({
        attributes: ['id', 'name'],
        where: {
            name: req.params.key
        }
    })
    .then((data) => {
        return res.status(200).json({
            error: false,
            data
        })
    })
    .catch(() => {
        res.status(400).json({
            erro: true,
            mensage: "Nenhum resultado"
        })
    })
})

module.exports = router;