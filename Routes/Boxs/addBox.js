const express = require('express');
const router = express.Router();

const Boxs = require('../../Model/boxs');
const Uep = require('../../Model/uep');

router.post('/', async (req, res, next) => {
    const box = await Boxs.create(req.body);

    const id = parseInt(req.body.uep)
    const idBox =parseInt(req.body.idBox)
    
    const updateUep = await Uep.update({
        qntBoxs: idBox
    }, {
        where: {
            id
        }
    })
    res.status(200).json({
        error: false,
        response: {
            box,
            updateUep
        }
    })

})

module.exports = router;