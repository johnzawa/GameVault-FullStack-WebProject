import styles from './GameCard.module.css'

function RatingBar({ value }) {
  const pct = (value / 10) * 100
  const color = value >= 9 ? 'var(--green)' : value >= 8 ? 'var(--accent)' : value >= 7 ? 'var(--blue)' : 'var(--red)'
  return (
    <div className={styles.ratingBar}>
      <div className={styles.ratingFill} style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

function StatusBadge({ status }) {
  const cls = status === 'Available' ? styles.statusAvail
    : status === 'Early Access' ? styles.statusEarly
    : styles.statusSoon
  return <span className={`${styles.badge} ${cls}`}>{status}</span>
}

export default function GameCard({ game, index }) {
  return (
    <div className={styles.card} style={{ animationDelay: `${index * 40}ms` }}>
      <div className={styles.index}>{String(index + 1).padStart(2, '0')}</div>

      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{game.title}</h3>
            <StatusBadge status={game.status} />
          </div>
          <div className={styles.meta}>
            <span className={styles.developer}>{game.developer}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.genre}>{game.genre}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.year}>{game.year}</span>
          </div>
        </div>

        <div className={styles.platform}>{game.platform}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.ratingBlock}>
          <span className={styles.ratingNum}>{game.rating.toFixed(1)}</span>
          <RatingBar value={game.rating} />
          <span className={styles.metaScore}>MC {game.metacritic}</span>
        </div>
        <div className={styles.price}>${game.price.toFixed(2)}</div>
      </div>
    </div>
  )
}
