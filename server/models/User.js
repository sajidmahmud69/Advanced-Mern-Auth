import mongoose from 'mongoose'

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

const User = mongoose.model ("User", UserSchema)

export default User