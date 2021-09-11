const express = require('express')
const router = express.Router()

const Boxs = require('../../Model/boxs')

router.post('/', async (req, res, next) => {

    const lastIndex = await Boxs.findAll({
        attributes:['idBox'],
        limit: 1,
        order: [ ['idBox', 'DESC']],
        where: {
            uep: req.body.uep
        }
    })

    Boxs.findAll({
        attributes: ['id', 'uep', 'idBox', 'idSector', 'boxOpen', 'openingFor'],
        where: {
            uep: req.body.uep,
            boxOpen: req.body.boxOpen
        }
    })
    .then((response) => res.status(200).json({
        error: false,
        response,
        lastIndex
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Error: Inesperado"
    }))

})

module.exports = router