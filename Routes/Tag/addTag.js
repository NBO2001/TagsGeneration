const express = require('express');
const router = express.Router();

const Tags = require('../../Model/tags');

router.get('/:idBox', async (req, res, next) => {

    const { idBox } = req.params;
    
    const lastDate = await Tags.findAll({
        attributes:['dateStart'],
        limit: 1,
        order: [ ['dateStart', 'DESC']],
        where: {
            idBox
        }
    })
    const firstDate = await Tags.findAll({
        attributes:['client','idSector','idBox','uep','dateStart'],
        limit: 1,
        order: [ ['dateEnd', 'ASC']],
        where: {
            idBox
        }
    })

    Tags.findAll({
        group:['typeDoc'],
        attributes: ['typeDoc'],
        where: {
            idBox
        }
    })
    .then((response) => res.status(200).json({
        error: false,
        response,
        firstDate,
        lastDate,
    }))
    .catch((err) => res.status(501).json({
        error: true,
        msg: "Erro interno"
    }))

})

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