const { body } = require('express-validator');


module.exports = [

    body('title').custom((value)=>{
        if(value.length < 4) {
            throw new Error('Title shoud be at least 4 characters')
        }
        return true
    }),
    body('description').custom((value)=>{
        if(value.length < 20 || value.length > 50) {
            throw new Error('Description shoud be between 20 and 50 characters')
        }
        return true
    }),
    body('imageUrl').custom((value)=>{
        if(!value.startsWith('http') || !value.startsWith('https')) {
            throw new Error('Not correct imageUrl adress')
        }
        return true
    })
]