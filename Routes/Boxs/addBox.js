const express = require('express');
const router = express.Router();

const Boxs = require('../../Model/boxs');
const Uep = require('../../Model/uep');

router.post('/', async (req, res, next) => {
    

    try{
        const id = parseInt(req.body.uep)
        const lastIndex = await Uep.findAll({
            attributes: ['qntBoxs'],
            where: {
                id
            }
        });
        const [ qntB ] = lastIndex;
        const quantBoxs = qntB.dataValues;

        const qntBoxs = (quantBoxs.qntBoxs) + 1;

        const updateUep = await Uep.update({
            qntBoxs: qntBoxs
        }, {
            where: {
                id
            }
        })
        const reqBody = {...req.body, idBox: qntBoxs
        }
       const response = await Boxs.create(reqBody);

        res.status(200).json({
            error: false,
            response
        })

        
    }catch(err){
        res.status(500).json({
            error: true,
            err
        })
    }

    // res.status(200).json({
    //     error: false,
    //     response: {
    //         box,
    //         updateUep
    //     }
    // })

})

module.exports = router;