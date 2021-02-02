const couserModel = require('../models/course');
const userModel = require('../models/user');
const { validationResult } = require('express-validator');

module.exports = {

    getCreateCourse:function(req,res) {
        res.render('create')
    },
    postCreateCourse:function(req,res,next) {
        const {title,description,imageUrl,duration} = req.body;
        const creator = req.user._id

        
       // const options = { weekday: 'short',month: 'long', day: 'numeric',time:'numeric',hour:'numeric',minute:'numeric',second:'numeric' };
        const createdAt = new Date().toString().slice(0,24)

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('create',{errorMessage:errors.array()[0].msg})
        }

        couserModel.create({title,description,imageUrl,duration,createdAt,creator}).then((course)=>{
            res.redirect('/')
        }).catch(next);
    },
    getCourseDetails: function(req,res,next) {
        const id = req.params.id;
        const userId = req.user._id
        couserModel.findById(id).lean()
        .then((course)=>{
            if(course.creator.toString() === userId) {
                res.locals.isCreator = true
            }
            let enrUser = course.usersEnrolled.filter(x=>x.toString() === userId)
            if(enrUser.length != 0) {
                res.locals.isEnrolled = true
            }
            
            res.render('details',{course})
        }).catch(next)
    },
    getEditCourse: function(req,res,next) {
        const id = req.params.id
        couserModel.findById(id).lean()
        .then((course)=>{
            res.render('edit',{course})
        }).catch(next);
    },
    postEditCourse: function(req,res,next) {
        const id = req.params.id;
        const {title,description,imageUrl,duration} = req.body

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('create',{errorMessage:errors.array()[0].msg})
        }
        couserModel.updateOne({_id:id},{title,description,imageUrl,duration})
        .then(()=>{
            res.redirect('/details/'+ id)
        }).catch(next)
    },
    getDelete: function(req,res,next) {
        const id = req.params.id;
        couserModel.deleteOne({_id:id}).then(()=>{
            res.redirect('/')
        }).catch(next)
    },
    postEnrolled:function(req,res,next) {
        const courseId = req.params.id;
        const userId = req.user._id

        return Promise.all([
            couserModel.updateOne({_id:courseId},{$addToSet: { usersEnrolled: [userId] }}),
            userModel.updateOne({_id:userId},{$addToSet: {coursesEnrolled: [courseId]}})
        ]).then(([updatetCourse,updateUser])=>{
            res.redirect('/details/'+courseId)
        }).catch(next)
    }
} 