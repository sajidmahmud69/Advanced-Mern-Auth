import User from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js'
import errorResponse from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'


// handles register route functionality
const register = async (req, res, next) => {
    const { username, email, password }  = req.body

    try {
        const user = await User.create ({
            username, email, password
        })
        sendToken (user, 201, res)
    }catch (err){
        next (err)
    }
}

// handles login route functionality
const login = async (req, res, next) => {
    const { email, password } = req.body
    
    // check that both email and password field has some value
    if (!email || ! password) {
        return next (new ErrorResponse ("Please provide email and password", 400))
    }
    
    try {
        const user = await User.findOne ({ email }).select ("+password")        // get the user with the password
        
        // if no user is found throw an error
        if (!user){
            return next (new ErrorResponse ("Invalid Credentials", 401))
        }
        
        // see if the entered password match with the db password
        const isMatch = await user.matchPassword (password)
        
        // if password doesn't match throw an error
        if (!isMatch) {
            return next (new ErrorResponse ("Invalid Credentials", 401))
        }
        
        sendToken (user, 200, res)
        
        
    }catch (err) {
        res.status (500).json ({
            success : false,
            error: err.message
        })
    }

}


// handles forgot password route functionality
const forgotPassword = async (req, res, next) => {
    // get the email from the request body
    const { email } = req.body

    try {
        // see if the user exixts otherwise return an error
        const user = await User.findOne ({ email })

        if (!user) {
            return next (new ErrorResponse ("Email could not be sent", 404))
        }

        // get the reset token to reset the password
        const resetToken = user.getResetPasswordToken ()

        //save the newly created resetPasswordToken field in the DB
        await user.save ()

        // create the reset URL
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

        const message = `
            <h1>You have requested to reset the password </h1>
            <p>Please go to this link to reset your password </p>
            <a href = ${resetUrl} clicktracking = off>${resetUrl}</a>
        `

        // send the email

        try {
            await sendEmail ({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status (200).json ({ success: true, data: "Email Sent" })
        } catch (err) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save ()

            return next (new ErrorResponse ("Email could not be sent", 500))
        }
    } catch (err) {
        next (err)
    }
}




// handles reset password route functionality
const resetPassword = async (req, res, next) => {
    // create a reset token
    const resetPasswordToken = crypto.createHash ("sha256").update (req.params.resetPasswordToken).digest ('hex')

    // search for a user who has the same token in the db
    try {
        const user = await User.findOne ({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }        // check that the expiration date is greater than current date
        })

        if (!user) {
            return next (new ErrorResponse ("Invalid Reset Token", 400))
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save ()

        return res.status(201).json ({ success: true, data: "Password Reset successful" })
    } catch (err) {
        next (err)
    }

}




// authentication part
// this function sends a token to define that user has signed in or registered a new account
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken ()        // should return a token
    res.status (statusCode).json  ({ success: true, token })
}

export { register, login, forgotPassword, resetPassword }       // named exports