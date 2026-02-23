import dotenv from 'dotenv'
dotenv.config({ quiet: true })

interface env {
    port: number
    frontendUrl: string
    jwtSecret: string
    nodeEnv: string
    dbUrl: string
}

const ENV: env = {
    port: Number(process.env.PORT || 8000),
    frontendUrl: String(process.env.FRONTEND_URL || "http://localhost:5173"),
    dbUrl: String(process.env.DATABASE_URL),
    jwtSecret: String(process.env.JWT_SECRET),
    nodeEnv: String(process.env.NODE_ENV),
}

export default ENV;