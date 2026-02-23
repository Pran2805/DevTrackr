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
}

const ENV: env = {
    port: Number(process.env.PORT || 8000),
    frontendUrl: String(process.env.FRONTEND_URL || "http://localhost:5173"),
    dbUrl: String(process.env.DATABASE_URL),
    jwtSecret: String(process.env.JWT_SECRET),
    nodeEnv: String(process.env.NODE_ENV),
    nodemailerEmail: String(process.env.NODEMAILER_MAIL),
    nodemailerPass: String(process.env.NODEMAILER_PASS),
    appName: "DevTrackr"
}

export default ENV;