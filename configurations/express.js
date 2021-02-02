const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const express = require('express');
const auth = require('../middlewares/checkAuth')


module.exports = (app)=>{

    app.engine('.hbs',handlebars({
        extname: '.hbs',
        partialsDir: 'views/partials',
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/layouts'
    }))
    app.set('view engine', 'hbs');
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(express.static('static'));
    app.use(auth)
}