const express = require('express');
const router = express.Router();

const Sectors = require('../../Model/sectors');

router.get('/', (req, res, next) => {
    Sectors.findAll({
        attributes: ['id', 'client', 'sector']
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