import express from 'express'
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import connectDB from './config/db.js'

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

// Connect the DB
connectDB ()


// routes
app.get ('/', (req, res) => {
    res.send ('Home page')
})

// listener
app.listen (PORT, () => console.log (`Server running on ${PORT}`))

