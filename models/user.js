const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
      name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Name cannot be more than 30 characters long']
      },
     email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter the valid email address']
     },
     password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
     },
     avatar:{
      public_id: {
         type: String,
         required: true
      },
      url: {
         type: String, 
         required: true
      }
     },

     role:{
        type: String,
        default: 'user'
     },
     createdAt: {
        type: Date,
        default: Date.now
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date
});

// Encrpyting password before saving users
userSchema.pre('save' , async function (next) {
      if(!this.isModified('passsword')){
         next()
      }

      this.password = await bcrypt.hash(this.password , 10)
})

 // Compare user password
//   userSchema.methods.comparePassword = async function(enteredPassword){ 
   //  return await bcrypt.compare(enteredPassword, this.password) 
//   } 
  userSchema.methods.comparePassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword , this.password)
  }

// return JWT token
  userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this.id}, process.env.JWT_SECRET , {
      expiresIn: process.env.JWT_EXPIRES_TIME
   });
  }
  
module.exports = mongoose.model('User', userSchema);