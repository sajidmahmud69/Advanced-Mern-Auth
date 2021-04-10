import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

const User = mongoose.model ("User", UserSchema)

export default User