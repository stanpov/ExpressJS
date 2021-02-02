const config = {

    development: {
        port: 2111,
        dbConnectionString: 'mongodb://localhost:27017/tutorials',
        authCookieName: 'auth-cookie',
        jwtsecret: 'super-secret',
        saltRounds: 11
    }
}

module.exports = config['development']
