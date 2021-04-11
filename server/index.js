import express from 'express'
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import privateRoute from './routes/private.js'
import connectDB from './config/db.js'
import errorHandler from './middleware/error.js'


// app config
dotenv.config ()
const app = express ()
const PORT = process.env.PORT || 8000

// middleware
app.use (express.json())
/* anytime there's a backend route call like localost:8000/api/auth/[SOMETHING]
   it will go to the auth file in routes folder and see which one it matches specifically
   When a match is found auth file in routes folder it will go auth file in controllers
   folder and see which matching function to call  
*/
app.use ('/api/auth', auth)
app.use ('/api/private', privateRoute)

// ERROR handler (SHOULD be last piece of middleware)
app.use (errorHandler)

// Connect the DB
connectDB ()


// routes
app.get ('/', (req, res) => {
    res.send ('Home page')
})

// listener
const server = app.listen (PORT, () => console.log (`Server running on ${PORT}`))

process.on ("unhandledRejection", (err, promise) => {
    console.log (`Logged Error: ${err}`)
    server.close (() => process.exit (1))
})
