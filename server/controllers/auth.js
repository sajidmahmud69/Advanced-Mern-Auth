import User from '../models/User.js'


// handles register route functionality
const register = async (req, res, next) => {
    const { username, email, password }  = req.body

    try {
        const user = await User.create ({
            username, email, password
        })
    }catch (err){
        res.json ({ errorMessage: err })
    }
}

// handles login route functionality
const login = (req, res, next) => {
    res.send ('Login Route')
}


// handles forgot password route functionality
const forgotPassword = (req, res, next) => {
    res.send ('Forgot Password Route')
}


// handles reset password route functionality
const resetPassword = (req, res, next) => {
    res.send ('Reset Password Route')
}


export { register, login, forgotPassword, resetPassword }       // named exports