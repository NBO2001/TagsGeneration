const express = require('express');
const router = express.Router();

const Users = require('../../Model/users');

router.post('/', (req, res, next) => {
    
    Users.create(req.body)
    .then(() => {
        return res.status(201).json({
            error: false,
            msg: "User add"
        })
    })
    .catch((err) => {
        return res.status(400).json({
            error: true,
            msg: "Error: Não add"
        })
    })

})

module.exports = router;