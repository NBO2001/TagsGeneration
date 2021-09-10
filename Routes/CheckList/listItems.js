const express = require('express');
const router = express.Router();

const CheckList = require('../../Model/checklist');

router.post('/', (req, res, next) => {
    CheckList.findAll({
        attributes: ['id', 'client', 'sector' ,'docType'],
        where: {
            client: req.body.client,
            sector:req.body.sector
        }
    })
    .then((response) => res.status(201).json({
        error: false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Erro ao tentar"
    }))
})

module.exports = router

