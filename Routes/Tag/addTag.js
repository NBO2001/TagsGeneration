const express = require('express');
const router = express.Router();

const Tags = require('../../Model/tags');

router.post('/', (req, res, next) => {
    Tags.create(req.body)
    .then((data) => {
        return res.status(200).json({
            error: false,
            data
        })
    })
    .catch(() => res.status(400).json({
        error: true,
        msg: "Erro Initrersm"
    }))
})

module.exports = router;