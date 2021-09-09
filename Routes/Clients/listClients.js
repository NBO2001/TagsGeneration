const express = require('express')
const router = express.Router()
const Clients = require('../../Model/clients')

router.get('/', (req, res, next ) => {
    Clients.findAll({
        attributes: ['id', 'client']
    })
    .then((response) => res.status(200).json({
        error:false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Error aoa listar"
    }))
})

router.post('/', (req, res, next ) => {
    Clients.findAll({
        attributes: ['id', 'client'],
        where: {
            client: req.body.client
        }
    })
    .then((response) => res.status(200).json({
        error:false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Error aoa listar"
    }))
})

module.exports = router