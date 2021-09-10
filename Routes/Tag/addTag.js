const express = require('express');
const router = express.Router();

const Tags = require('../../Model/tags');

router.post('/', (req, res, next) => {
    Tags.create(req.body)
    .then((data) => {
        return res.status(200).json({
            error: false,
            data
        })
    })
    .catch((err) => res.status(400).json({
        error: true,
        msg: err
    }))
})

module.exports = router;