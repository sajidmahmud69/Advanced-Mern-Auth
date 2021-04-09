import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config ()


const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.rgm0a.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


const connectDB = async () => {
    await mongoose.connect (CONNECTION_URL, {
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    console.log (`Database Connection Successful...`)
}

export default connectDB