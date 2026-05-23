import { useState, useMemo } from 'react'
import games from '../data/games'
import GameCard from '../components/GameCard'
import styles from './MainPage.module.css'

const GENRES = ['All', ...Array.from(new Set(games.map(g => g.genre))).sort()]

const SORT_OPTIONS = [
  { value: 'rating-desc', label: 'Rating: High → Low' },
  { value: 'rating-asc', label: 'Rating: Low → High' },
  { value: 'year-desc', label: 'Year: Newest' },
  { value: 'year-asc', label: 'Year: Oldest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'title-asc', label: 'Title: A → Z' },
]

export default function MainPage() {
  const [allGames] = useState(games)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [sort, setSort] = useState('rating-desc')

  const processed = useMemo(() => {
    // 1. Filter by search query AND genre simultaneously
    let result = allGames.filter(g => {
      const q = search.toLowerCase()
      const matchesSearch =
        q === '' ||
        g.title.toLowerCase().includes(q) ||
        g.developer.toLowerCase().includes(q) ||
        g.publisher.toLowerCase().includes(q)
      const matchesGenre = genre === 'All' || g.genre === genre
      return matchesSearch && matchesGenre
    })

    // 2. Sort with native .sort()
    const [field, dir] = sort.split('-')
    result = [...result].sort((a, b) => {
      let va = a[field], vb = b[field]
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      if (va < vb) return dir === 'asc' ? -1 : 1
      if (va > vb) return dir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [allGames, search, genre, sort])

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>The Definitive Collection</div>
        <h1 className={styles.heroTitle}>Game<span className={styles.accent}>Vault</span></h1>
        <p className={styles.heroSub}>
          {allGames.length} titles curated. Search, filter, and sort the catalog.
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by title, developer, publisher…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        <div className={styles.rightControls}>
          <div className={styles.genreTabs}>
            {GENRES.map(g => (
              <button
                key={g}
                className={`${styles.genreTab} ${genre === g ? styles.genreActive : ''}`}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results header */}
      <div className={styles.resultsHeader}>
        <span className={styles.resultCount}>
          <span className={styles.countNum}>{processed.length}</span> titles
        </span>
        {(search || genre !== 'All') && (
          <button className={styles.resetBtn} onClick={() => { setSearch(''); setGenre('All') }}>
            Clear filters
          </button>
        )}
      </div>

      {/* Game List */}
      {processed.length > 0 ? (
        <div className={styles.list}>
          {processed.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>◌</div>
          <p className={styles.emptyText}>No games match your criteria.</p>
          <button className={styles.resetBtn} onClick={() => { setSearch(''); setGenre('All') }}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}
