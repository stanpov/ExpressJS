const app = require('express')();
const config = require('./configurations/config');


require('./configurations/express')(app);
require('./configurations/router')(app);

const dbConnection = require('./configurations/database')()

dbConnection.then(()=>{
    app.listen(config.port,console.log('Server is listening now....'))
})