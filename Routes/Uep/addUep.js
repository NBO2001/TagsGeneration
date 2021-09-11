const express = require('express');
const router = express.Router();

const Uep = require('../../Model/uep')

router.post('/', async (req, res, next) => {

    const reqBody = {...req.body};

    const lastIndex = await Uep.findAll({
        attributes: ['idUep'],
        order: [['idUep', 'DESC']],
        limit: 1,
        where: {
            client: reqBody.client
        }
    })

    let index = 0;

    if(lastIndex.length){
        const [ { dataValues } ] = lastIndex
        index = dataValues.idUep;
    }
    
    const data = {
        ...reqBody,
        idUep: (index+1)
    }

    Uep.create(data)
    .then((response) => {
        return res.status(201).json({
            error: false,
            response
        })
    })
    .catch(() => {
        return res.status(400).json({
            error: true,
            msg: "Error: Não adds"
        })
    })

})

module.exports = router;