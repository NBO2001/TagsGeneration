const express = require('express')
const router = express.Router()

const Boxs = require('../../Model/boxs');
const Ueps = require('../../Model/uep');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    Boxs.findAll({
        attributes: ['id','uep', 'idBox', 'idSector'],
        where: {
            id
        }
    })
    .then((response) => {
        res.status(200).json({
            error: false,
            response
        })
    })
    .catch(( err) => res.status(500).json({
        error: true,
        msg: "Erro interno"
    }))
})
router.get('/sector/:idSector', async (req, res, next) => {
    
    try{
        const { idSector } = req.params

        const response = await Boxs.findAll({
            include: {
                model: Ueps
            }
            ,
            where:{
                idSector
            }
        })
        res.status(200).json({
            error: false,
            msg:  response
        })
    }catch(err){
        res.status(500).json({
            error:  true,
            msg: "Erro interno"
        })
    }


})
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