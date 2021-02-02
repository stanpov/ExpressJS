const { body } = require('express-validator');

module.exports = [

    body('password').custom((value)=>{
        let patern = /[A-Za-z0-9]/g
        if(value.length < 5 || !value.match(patern)) {
            throw new Error('Password is not in wrigth format or too short!');
        }
        return true
    }),
    body('username').custom((value)=>{
        let patern = /[A-Za-z0-9]/g
        if(value.length < 5 || !value.match(patern)) {
            throw new Error('Username is not in wrigth format or too short!');
        }

        return true
    })
]