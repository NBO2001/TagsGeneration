const express = require('express');
const router = express.Router();

const Sectors = require('../../Model/sectors');

router.post('/', (req, res, next) => {
    Sectors.findAll({
        attributes: ['id', 'client', 'sector'],
        where: {
            client: req.body.client
        }
    })
    .then((response) => res.status(201).json({
        error: false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Não add"
    }))
})

module.exports = router;