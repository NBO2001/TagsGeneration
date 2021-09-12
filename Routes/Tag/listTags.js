const express = require('express');
const Tags = require('../../Model/tags');
const router = express.Router();

router.get('/:id', (req, res, next) => {
    
    const { id } = req.params;
    console.log(id)
    Tags.findAll({
        where: {
            id
        }
    })
    .then((response) => res.status(200).json({
        error: false,
        response
    }))
    .catch((err) => res.status(501).json({
        error: true,
        msg: "Erro interno"
    }))
})

module.exports = router;