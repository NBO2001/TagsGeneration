const express = require('express');
const Tags = require('../../Model/tags');
const router = express.Router();

router.get('/:id', (req, res, next) => {
    
    const { id } = req.params;
    
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
router.delete('/:id', async (req, res, next) => {

    try{
    
        const { id } = req.params;
        
        const response = Tags.destroy({
            where:{
                id
            }
        })

        res.status(200).json({
            error: false,
            response
        })
    }catch(err){
        res.status(500).json({
            error: true,
            msg: "Error Interno"
        })
    }
    
})
router.put('/', async (req, res, next) => {

    try{

        const { id } = req.body;

        const response = await Tags.update(req.body,{
            where: {
                id
            }
        })

        res.status(200).json({
            error: false,
            response
        })
    }catch(err){
        
        res.status(500).json({
            error: true,
            msg: "Error Interno"
        })
    }

})

module.exports = router;