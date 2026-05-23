import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'
import postLogger from './middleware/logger.js'
import authRoutes from './routes/authRoutes.js'
import gameRoutes from './routes/gameRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: (origin, cb) => {
    const frontend = process.env.FRONTEND_URL
    const isLocalhost = origin && /^http:\/\/localhost:\d+$/.test(origin)
    const isFrontend = frontend && origin === frontend
    if (!origin || isLocalhost || isFrontend) cb(null, true)
    else cb(new Error(`CORS blocked: ${origin} (FRONTEND_URL=${frontend})`))
  },
  credentials: true
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}))
app.use(postLogger)
app.use('/api/auth', authRoutes)
app.use('/api/games', gameRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'GameVault API is running' })
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.error(err))

export default app