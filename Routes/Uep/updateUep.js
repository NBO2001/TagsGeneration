const express = require('express');
const router = express.Router();
const Uep = require('../../Model/uep')

router.put('/', (req, res, next) => {
    
    const { id } = req.body;

    Uep.update(req.body, {
        where: {
            id
        }
    })
    .then((data) => {
        return res.status(200).json({
            error: false,
            data
        })
    })
    .catch(() => {
        return res.status(400).json({
            error: true,
            msg: "Ocorreu um erro"
        })
    })
})

module.exports = router;