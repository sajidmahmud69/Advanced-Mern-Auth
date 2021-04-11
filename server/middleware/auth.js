// This middleware job is to check for jsonwebtoken in the headers

import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js'

const protect = async (req, res, next) => {
    let token

    // if authorization headers exists and it starts with Bearer then it is an authentication token
    if (req.headers.authorization && req.headers.authorization.startsWith ("Bearer")) {
        // it will look like this   Bearer B$Iugr87T&
        // so after split it will have an array of 2 elements [Bearer, B$Iugr87T&]
        token = req.headers.authorization.split (" ")[1]
    }

    if (!token) {
        return next (new ErrorResponse ("Not authorized to access this route", 401))
    }
    
    try {
        // decode the jwt token
        const decoded = jwt.verify (token, process.env.JWT_SECRET_KEY)

        // get the user by its id since it will be in the jwt
        const user = await User.findById (decoded.id)

        if (!user){
            return next (new ErrorResponse ("No user found with this id", 404))
        }

        req.user = user

        next ()
    } catch (err) {
        return next (new ErrorResponse ("Not authorized to access this route", 401))
    }
}

export default protect