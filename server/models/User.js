import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const UserSchema = mongoose.Schema ({
    username: {
        type: String,
        required: [true, "Please provide a username"]       // 2nd args is an error msg
    },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match : [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please provide a valid email"
        ]
    },

    password: {
        type: String,
        requiredL: [true, "Please provide a password"],
        minlength: 6,
        select: false       // whenever we query for the user don't send the password unless we explicitly ask for it
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})








// Some utility function for Database

// run this function before saving it into the DB
UserSchema.pre ("save", async function (next) {
    // next is a middleware
    if (!this.isModified ("password")){     // if the password is not modified don't rehash it
        next ()
    }

    const salt = await bcrypt.genSalt (10)
    this.password  = await bcrypt.hash (this.password, salt)
    next ()
})




UserSchema.methods.matchPassword = async function (password) {
    // password is provided by the user through the form and this.password is the password that DB found 
    // for that corresponding email
    return await bcrypt.compare (password, this.password)
}





UserSchema.methods.getSignedToken = function () {
    // getting a token for signing in
    return jwt.sign ({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME })
}



/* 
    generate a reset password token and send it as a req.params in the frontend url
    but at the same time get that token and hash it and save it in the db with an 
    expiration date
    
    So, when next time when you want to reset the password get that token from the 
    req.params front end url and hash it

    This hash should match the one in the db which would indicate that that specifc
    user has requested to reset their password
*/
UserSchema.methods.getResetPasswordToken  =  function () {
    // generate a reset token
    const resetToken = crypto.randomBytes (20).toString ('hex')

    // hash the reset token
    this.resetPasswordToken = crypto.createHash ("sha256").update (resetToken).digest ('hex')


    // reset password expire in 10 minutes
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken
}

const User = mongoose.model ("User", UserSchema)

export default User