import mongoose from 'mongoose'
import ENV from '../utils/env.ts'

export const connectDB = async() =>{
    const connection = await mongoose.connect(ENV.dbUrl)
    console.log("Database connected successfully", connection.connection.host)
}