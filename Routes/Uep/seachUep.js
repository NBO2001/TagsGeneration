const express = require('express');
const router = express.Router();
const Uep = require('../../Model/uep')

router.post('/', (req, res, next) => {

    Uep.findAll({
        attributes: ['id','qntBoxs', 'uepOpen', 'openingFor'],
        where: {
            openingFor: req.body.openingFor,
            uepOpen: req.body.uepOpen
        }
    })

})

module.exports = router;