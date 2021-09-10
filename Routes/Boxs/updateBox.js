const  express = require('express');
const Boxs = require('../../Model/boxs');
const router =  express.Router()


 router.put('/', (req, res, next) => {
    
    const { id } = req.body
    
    Boxs.update(req.body, {
        where: {
            id
        }
    })
    .then((response) => res.status(200).json({
        error:false,
        response
    }))
    .catch(() => res.status(400).json({
        error: true,
        msg: "Error interno"
    }))

})

module.exports = router