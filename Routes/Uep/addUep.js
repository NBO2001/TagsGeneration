const express = require('express');
const router = express.Router();

const Uep = require('../../Model/uep')

router.post('/', (req, res, next) => {

    Uep.create(req.body)
    .then((data) => {
        return res.status(201).json({
            error: false,
            data
        })
    })
    .catch(() => {
        return res.status(400).json({
            error: true,
            msg: "Error: Não add"
        })
    })

})

module.exports = router;