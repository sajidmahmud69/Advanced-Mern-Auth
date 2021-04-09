import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import auth from './routes/auth.js'

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

// db config
// const DB_NAME = process.env.DB_NAME
// const DB_PASSWORD = process.env.DB_PASSWORD
// const CONNECTION_URL = null

// mongoose.connect (CONNECTION_URL, {
//     useCreateIndex: true,
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }, () => console.log (`Database Connection Successful...`))



// routes
app.get ('/', (req, res) => {
    res.send ('Home page')
})

// listener
app.listen (PORT, () => console.log (`Server running on ${PORT}`))

