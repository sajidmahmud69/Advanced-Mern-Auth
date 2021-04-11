// This middleware's job is to catch any errors throughout the system

import ErrorResponse from '../utils/errorResponse.js'

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message

    // console.log (err)

    if (err.code === 11000){
        // 11000 means duplicate error key
        const message = "Duplicate Field Value Entered"
        error = new ErrorResponse (message, 400)
    }

    if (err.name === "ValidationError") {
        const message = Object.values (err.errors).map (val => val.message)
        error = new ErrorResponse (message, 400)
    }

    res.status (error.statusCode || 500).json ({
        success: false,
        error: error.message || "Server Error"
    })
}

export default errorHandler