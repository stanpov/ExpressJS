module.exports = function checkAuth(sholdBeAthenticated) {
    return function(req,res,next) {
        if((sholdBeAthenticated && !req.user) || (!sholdBeAthenticated && req.user)) {
            res.redirect('/')
        }
        next();
    }
}