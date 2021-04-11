import User from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js'
import errorResponse from '../utils/errorResponse.js'


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
const forgotPassword = (req, res, next) => {
    res.send ('Forgot Password Route')
}


// handles reset password route functionality
const resetPassword = (req, res, next) => {
    res.send ('Reset Password Route')
}


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken ()        // should return a token
    res.status (statusCode).json  ({ success: true, token })
}

export { register, login, forgotPassword, resetPassword }       // named exports