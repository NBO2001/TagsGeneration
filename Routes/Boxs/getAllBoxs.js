const express = require('express')
const router = express.Router()

const Boxs = require('../../Model/boxs')

router.get('/:uep', async (req, res, next) => {
    try{
        let { uep } = req.params;
        uep = parseInt(uep)
        const response = await Boxs.findAll({
            attributes: ['id','uep','idBox','idSector'],
            where:{
                uep
            }
        })
        res.status(200).json({
            error: false,
            response
        })
    }
    catch(err){
        res.status(500).json({
            error: false,
            msg: "Erro interno"
        })
    }   
    
    
})
module.exports = router