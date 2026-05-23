import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  developer: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  price: { type: Number, required: true },
  metacritic: { type: Number },
  status: { type: String, enum: ['Available', 'Early Access', 'Coming Soon'], default: 'Available' },
  isDefault: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default mongoose.model('Game', gameSchema)