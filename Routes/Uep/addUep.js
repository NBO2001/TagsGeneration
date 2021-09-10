const express = require('express');
const router = express.Router();

const Uep = require('../../Model/uep')

router.post('/', (req, res, next) => {

    Uep.create(req.body)
    .then((response) => {
        return res.status(201).json({
            error: false,
            response
        })
    })
    .catch(() => {
        return res.status(400).json({
            error: true,
            msg: "Error: Não adds"
        })
    })

})

module.exports = router;