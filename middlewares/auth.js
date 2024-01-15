const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

// check if the user is authenticated or not

exports.isAuthenticatedUser = catchAsyncError(async(req , res , next)=>{
 
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler('login first to access this resource' , 401))
    }
   
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = await UserActivation.findById(decoded.id)

    next()

})

// handling the users roles
exports.authorizeRoles = (...roles) => {
    return (req , rea , next) => {
        if(roles.includes(req.user.role)){
            // return next()
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource` , 403)
        } 
        next()
    }
}
