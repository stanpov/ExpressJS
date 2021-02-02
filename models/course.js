const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({

    title: {
        type:String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    creator: [{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Course',courseSchema)