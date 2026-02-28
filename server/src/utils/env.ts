import dotenv from 'dotenv'
dotenv.config({ quiet: true })

interface env {
    port: number
    frontendUrl: string
    jwtSecret: string
    nodeEnv: string
    dbUrl: string
    nodemailerEmail: string
    nodemailerPass: string
    appName: string
    cloudinaryName: string
    cloudinaryApiKey: string
    cloudinaryApiSecret: string
}

const ENV: env = {
    appName: "DevTrackr",
    port: Number(process.env.PORT || 8000),
    dbUrl: String(process.env.DATABASE_URL),
    frontendUrl: String(process.env.FRONTEND_URL || "http://localhost:5173"),
    jwtSecret: String(process.env.JWT_SECRET),
    nodeEnv: String(process.env.NODE_ENV),
    nodemailerEmail: String(process.env.NODEMAILER_MAIL),
    nodemailerPass: String(process.env.NODEMAILER_PASS),
    cloudinaryName: String(process.env.CLOUDINARY_NAME),
    cloudinaryApiKey: String(process.env.CLOUDINARY_API_KEY),
    cloudinaryApiSecret: String(process.env.CLOUDINARY_API_SECRET),
}

export default ENV;