const express = require('express');
const router = express.Router();

const Boxs = require('../../Model/boxs')

router.post('/', (req, res, next) => {
    Boxs.create(req.body)
    .then((data) => {
        return res.status(200).json({
            error: false,
            data
        })
    })
    .catch(() => {
        return res.status(400).json({
            error: true,
            msg: "Erro inesperado"
        })
    })
})

module.exports = router;