const express = require('express');
const router = express.Router();

const CheckList = require('../../Model/checklist');

router.post('/', (req, res, next) => {
    CheckList.create(req.body)
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

