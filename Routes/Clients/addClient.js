const express = require('express');
const router = express.Router();

const Clients = require('../../Model/clients');

router.post('/', (req,res, next) => {
    Clients.create(req.body)
    .then((response) => {
        return res.status(201).json({
            error: false,
            response
        })
    })
    .catch( () => res.status(400).json({
        error: true,
        msg: "Error: Não add"
    }))
})

module.exports = router