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

// 1. CRITICAL FOR RENDER SESSIONS: Trust the Render reverse proxy
app.set('trust proxy', 1) 

app.use(express.json())

// 2. SIMPLIFIED & ROBUST CORS CONFIGURATION
const allowedOrigins = [
  'https://gamevault-fullstack-webproject-1.onrender.com', // Your live frontend
  'http://localhost:5173',                               // Your local vite dev server (adjust port if needed)
  'http://localhost:3000'
]

app.use(cors({
  origin: (origin, cb) => {
    // If the request has no origin (like mobile apps, curl, or server-to-server), allow it
    if (!origin) return cb(null, true)
    
    // Check if the origin matches any allowed domain or our FRONTEND_URL env var
    const cleanFrontendEnv = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : null
    
    if (allowedOrigins.includes(origin) || origin === cleanFrontendEnv) {
      cb(null, true)
    } else {
      // Don't throw a hard Node error, just reject the CORS match safely
      cb(null, false) 
    }
  },
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    // Ensure NODE_ENV is set to 'production' in your Render environment variables!
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}))

app.use(postLogger)
app.use('/api/auth', authRoutes)
app.use('/api/games', gameRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'GameVault API is running' })
})

// Fallback port for deployment environments
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => console.error(err))

export default app