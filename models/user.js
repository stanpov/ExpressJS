const mongoose = require('mongoose');
const brcypt = require('bcrypt')
const config = require('../configurations/config')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    coursesEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
})

userSchema.methods.checkPassword = function(providedPass) {
    return new Promise((resolve,reject)=>{
        brcypt.compare(providedPass,this.password,function(err,result){
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

userSchema.pre('save',function(done) {
    const user = this;

    if(!user.isModified()) {
        done();
        return
    }
    brcypt.genSalt(config.saltRounds,(err,salt)=>{
        if(err) {
            done(err)
            return
        }
        brcypt.hash(user.password,salt,(err,encrypted)=>{
            if(err) {
                done(err);
                return;
            }
            user.password = encrypted;
            done()
        })
    })
})

module.exports = mongoose.model('User',userSchema)