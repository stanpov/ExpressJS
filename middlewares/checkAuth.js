const config = require('../configurations/config');
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {

    const token = req.cookies[config.authCookieName]
    if(!token) {
        next();
        return
    }

    jwt.verify(token,config.jwtsecret,function(err,decoded){
        if(err) {
            next(err);
            return
        }
        req.user = {_id:decoded.userId,username:decoded.username};
        res.locals.isLoggedIn = true;
        res.locals.username = req.user.username
        next()
    })
}