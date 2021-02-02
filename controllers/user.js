const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../configurations/config');
const courseModel = require('../models/course');
const { validationResult } = require('express-validator');


module.exports = {
    getHome: function(req,res,next) {
        const {search} = req.query;
        let query = {};
        if(search) {
            query.title = new RegExp(search,'i')
        }
        let criteria;
       
        if(res.locals.isLoggedIn === undefined) {
           criteria = {usersEnrolled: '-1'}
        } else {
            criteria = {createdAt: '1'}
        }
        let limited = res.locals.isLoggedIn ? 0 : 3
        courseModel.find(query).limit(limited).sort(criteria).lean()
        .then((course)=>{
            res.render('home',{course,search})
        })
    },
    getRegister: function(req,res,next) {
        res.render('register')
    },
    getLogin: function(req,res) {
        res.render('login')
    },
    postRegister: function(req,res,next) {
        const {username,password,rePassword} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('register',{errorMessage:errors.array()[0].msg})
        }

        if(password !== rePassword) {
            res.render('register',{errorMessage: 'Password dont match'})
            return
        }
        userModel.create({username,password})
        .then(()=>{
            res.redirect('/login')
        }).catch(next,{errorMessage: next})
    },
    postLogin: function(req,res,next) {
        const {username,password} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('login',{errorMessage:errors.array()[0].msg})
        }

        userModel.findOne({username}).then((user)=>{
          return  Promise.all([user,user ? user.checkPassword(password):false])
            .then(([user,match])=>{
                if(!match) {
                    res.render('login',{errorMessage: 'Wrong username or password'});
                    return;
                } else {
                    return jwt.sign({userId:user._id,username:user.username},config.jwtsecret)
                }
               
            }).then((token)=>{
                res.cookie(config.authCookieName,token,{httpOnly:true});
                res.redirect('/')
            }).catch(next,{errorMessage:next})
        })
    },
    getLogOut:function(req,res,next) {
        res.clearCookie(config.authCookieName);
        res.redirect('/');
    }
}