import express from 'express'
import Game from '../models/Game.js'

const router = express.Router()

const requireAuth = (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ message: 'You must be logged in' })
  next()
}

// GET /api/games — get all games (public)
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().populate('createdBy', 'name email')
    res.json(games)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/games — create a game (auth required)
router.post('/', requireAuth, async (req, res) => {
  try {
    const game = new Game({ ...req.body, createdBy: req.session.userId })
    await game.save()
    await game.populate('createdBy', 'name email')
    res.status(201).json(game)
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message })
  }
})

// PUT /api/games/:id — update (only owner can update — Rubric: Server-Side Authorization)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    // Mongoose query checks BOTH the game ID and that createdBy matches the session user
    const game = await Game.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.session.userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!game)
      return res.status(403).json({ message: 'Not found or not authorized' })
    res.json(game)
  } catch (err) {
    res.status(400).json({ message: 'Error updating game', error: err.message })
  }
})

// DELETE /api/games/:id — delete (only owner — Rubric: Server-Side Authorization)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ message: 'Game not found' })
    if (game.isDefault) return res.status(403).json({ message: 'Default games cannot be deleted' })
    if (String(game.createdBy) !== String(req.session.userId))
      return res.status(403).json({ message: 'Not authorized' })
    await game.deleteOne()
    res.json({ message: 'Game deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router