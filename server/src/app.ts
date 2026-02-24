import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import ENV from './utils/env.ts'
import router from './routes/index.ts'

const app = express()

app.use(cors({
    origin: [ENV.frontendUrl],
    credentials: true
}))

app.use(express.json({}))
app.use(helmet())
app.use(morgan('short'))

app.use("/api/v1", router)

export default app;