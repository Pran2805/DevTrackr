import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import ENV from './utils/env.ts'

const app = express()

app.use(cors({
    origin: [ENV.frontendUrl],
    credentials: true
}))

app.use(express.json({}))
app.use(helmet())
app.use(morgan('short'))

export default app;