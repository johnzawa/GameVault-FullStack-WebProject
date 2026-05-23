import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Game from './models/Game.js'

dotenv.config()

const DEFAULT_GAMES = [
  {
    title: 'The Witcher 3: Wild Hunt',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    genre: 'RPG',
    platform: 'PC / PS4 / Xbox One / Switch',
    year: 2015,
    rating: 9.6,
    price: 39.99,
    metacritic: 93,
    status: 'Available',
  },
  {
    title: 'Red Dead Redemption 2',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    genre: 'Action-Adventure',
    platform: 'PC / PS4 / Xbox One',
    year: 2018,
    rating: 9.7,
    price: 59.99,
    metacritic: 97,
    status: 'Available',
  },
  {
    title: 'Elden Ring',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    genre: 'Action RPG',
    platform: 'PC / PS5 / Xbox Series X',
    year: 2022,
    rating: 9.5,
    price: 59.99,
    metacritic: 96,
    status: 'Available',
  },
  {
    title: 'God of War',
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    genre: 'Action-Adventure',
    platform: 'PS4 / PC',
    year: 2018,
    rating: 9.4,
    price: 29.99,
    metacritic: 94,
    status: 'Available',
  },
  {
    title: 'Cyberpunk 2077',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    genre: 'Action RPG',
    platform: 'PC / PS5 / Xbox Series X',
    year: 2020,
    rating: 8.7,
    price: 49.99,
    metacritic: 86,
    status: 'Available',
  },
  {
    title: 'Minecraft',
    developer: 'Mojang Studios',
    publisher: 'Mojang Studios',
    genre: 'Sandbox',
    platform: 'PC / PS4 / Xbox One / Switch / Mobile',
    year: 2011,
    rating: 9.2,
    price: 26.95,
    metacritic: 93,
    status: 'Available',
  },
  {
    title: 'Hades',
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    genre: 'Roguelike',
    platform: 'PC / PS4 / Xbox One / Switch',
    year: 2020,
    rating: 9.3,
    price: 24.99,
    metacritic: 93,
    status: 'Available',
  },
  {
    title: 'Hollow Knight',
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    genre: 'Metroidvania',
    platform: 'PC / PS4 / Xbox One / Switch',
    year: 2017,
    rating: 9.1,
    price: 14.99,
    metacritic: 87,
    status: 'Available',
  },
  {
    title: 'Baldur\'s Gate 3',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    genre: 'RPG',
    platform: 'PC / PS5',
    year: 2023,
    rating: 9.8,
    price: 59.99,
    metacritic: 96,
    status: 'Available',
  },
  {
    title: 'Sekiro: Shadows Die Twice',
    developer: 'FromSoftware',
    publisher: 'Activision',
    genre: 'Action RPG',
    platform: 'PC / PS4 / Xbox One',
    year: 2019,
    rating: 9.2,
    price: 39.99,
    metacritic: 91,
    status: 'Available',
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')

  const existing = await Game.countDocuments({ isDefault: true })
  if (existing > 0) {
    console.log(`Skipping — ${existing} default games already seeded.`)
    await mongoose.disconnect()
    return
  }

  const docs = DEFAULT_GAMES.map(g => ({ ...g, isDefault: true }))
  await Game.insertMany(docs)
  console.log(`Seeded ${docs.length} default games.`)
  await mongoose.disconnect()
}

seed().catch(err => { console.error(err); process.exit(1) })
