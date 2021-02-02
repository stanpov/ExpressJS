const config = require('./config');
const mongoose = require('mongoose');

module.exports = ()=>{


return mongoose.connect(config.dbConnectionString,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
.then(()=>{
    console.log('Connected to database successfully.');
})

}