const express = require('express');
const router = express.Router();
const Uep = require('../../Model/uep')

router.post('/', (req, res, next) => {
    Uep.findAll({
        attributes: ['id','idUep','qntBoxs', 'uepOpen', 'openingFor'],
        where: {
            client: req.body.client,
            openingFor: req.body.openingFor,
            uepOpen: req.body.uepOpen
        }
    })
    .then((response) => res.status(200).json({
        error: false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Error: inesperado"
    }))

})

module.exports = router;