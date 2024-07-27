import express from 'express'
import http from 'http'
import cors from 'cors'
import { connectDB } from './utils/database/mongo-connection'
import { MONGO_URL } from './config'
import { authRouter, contactRouter } from './routes'
import { authMiddleware, errorHandler } from './middleware'

const app = express()
const server = http.createServer(app)

const startServer = async () => {
	await connectDB(MONGO_URL)
	app.use(
		cors({
			origin: '*',
			credentials: true
		})
	)
	app.use(express.json())
	app.use(`/api/${process.env.VERSION}/auth`, authRouter)
	app.use(`/api/${process.env.VERSION}/contact`, authMiddleware, contactRouter)

	app.use([errorHandler])

	server.listen(5003, async () => {
		console.log('Listening on *:5003')
	})

	process.on('SIGINT', async () => {
		process.exit()
	})
}

startServer()
