const express = require('express');
const Clients = require('../../Model/clients');
const router = express.Router();

const Sectors = require('../../Model/sectors');

router.get('/:id', async (req, res, next) => {
    try{

        const { id } = req.params
    
        let response = {};
    
        const sector = await Sectors.findAll({
            attributes: ['client', 'sector'],
            where:{
                id
            }
        })
        if(sector.length){
            
            const [ arrayTemp ] = sector;
            
            const dataVal = arrayTemp.dataValues;
    
            response = {...dataVal, ...response}
            const client = dataVal.client;
            
            const dataClient = await Clients.findAll({
                attributes: ['clientName','logoUrl'],
                where: {
                    client
                }
            })
            
            if(dataClient.length){
                
                const [ arTem ] = dataClient;
                
                const valuesClients = arTem.dataValues;
                response = { ...valuesClients, ...response}
                
            }
        }
        
        return res.status(200).json({
            error: false,
            response
        })
        
    }
    catch(err){
        return res.status(500).json({
            error: false,
            msg: "Erro interno"
        })
    }
})

router.post('/', (req, res, next) => {
    Sectors.findAll({
        attributes: ['id', 'client', 'sector'],
        where: {
            client: req.body.client
        }
    })
    .then((response) => res.status(201).json({
        error: false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Não add"
    }))
})

module.exports = router;