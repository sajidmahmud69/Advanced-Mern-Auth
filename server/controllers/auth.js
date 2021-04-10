import User from '../models/User.js'


// handles register route functionality
const register = async (req, res, next) => {
    const { username, email, password }  = req.body

    try {
        const user = await User.create ({
            username, email, password
        })
        res.status (201).json ({
            success: true,
            user
        })
    }catch (err){
        res.status (500).json ({
            success : false,
            error: err.message
        })
    }
}

// handles login route functionality
const login = async (req, res, next) => {
    const { email, password } = req.body
    
    // check that both email and password field has some value
    if (!email || ! password) {
        res.status (400).json ({ success: false , error: "Please provide email and password" })
    }
    
    try {
        const user = await User.findOne ({ email }).select ("+password")        // get the user with the password
        
        // if no user is found throw an error
        if (!user){
            res.status (404).json ({ success: false, error: "Invalid Credentials" })
        }
        
        // see if the entered password match with the db password
        const isMatch = await user.matchPassword (password)

        if (!isMatch) {
            res.status (404).json ({ success: true, error: "Invalid Credentials"})
        }

        res.status (200).json ({
            success: true,
            token: "THISISTOKEN"
        })
        
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


export { register, login, forgotPassword, resetPassword }       // named exports