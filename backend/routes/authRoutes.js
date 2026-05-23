import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' })
    if (password.length < 8)
      return res.status(400).json({ message: 'Password must be at least 8 characters' })

    const existing = await User.findOne({ email })
    if (existing)
      return res.status(409).json({ message: 'Email already in use' })

    const user = new User({ name, email, password })
    await user.save()

    // Start session immediately after register
    req.session.userId = user._id
    res.status(201).json({ message: 'Registered successfully', user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    req.session.userId = user._id
    res.json({ message: 'Logged in', user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out' })
  })
})

// GET /api/auth/me — check who is currently logged in
router.get('/me', async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: 'Not authenticated' })
  try {
    const user = await User.findById(req.session.userId).select('-password')
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router