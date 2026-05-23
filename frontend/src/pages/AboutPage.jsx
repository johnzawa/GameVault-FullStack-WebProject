import styles from './AboutPage.module.css'

const TEAM = [
  {
    name: 'Member 1',
    id: 'STU-001',
    role: 'Frontend Lead',
    parts: 'Header, routing, MainPage filtering logic, GameCard component',
  },
  {
    name: 'Member 2',
    id: 'STU-002',
    role: 'UI & Data',
    parts: 'CSS design system, dataset curation, Login & Register pages',
  },
  {
    name: 'Member 3',
    id: 'STU-003',
    role: 'Deployment & QA',
    parts: 'Render.com deployment, responsive testing, About page',
  },
]

const STACK = [
  { label: 'Framework', value: 'React 18 (Vite)' },
  { label: 'Routing', value: 'React Router v6' },
  { label: 'Styling', value: 'CSS Modules' },
  { label: 'Language', value: 'JavaScript (ES2022)' },
  { label: 'Deployment', value: 'Render.com — Static Site' },
  { label: 'Version Control', value: 'GitHub' },
]

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className={styles.hero}>
        <div className={styles.eyebrow}>Project 01 — MERN Stack</div>
        <h1 className={styles.title}>About<br /><span className={styles.accent}>GameVault</span></h1>
        <p className={styles.desc}>
          GameVault is a component-based React SPA built as part of the Web Applications Programming and Engineering course.
          It demonstrates modern frontend engineering: client-side routing, combined filter + sort state management using
          native JavaScript array methods, and a responsive, production-grade UI design.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tech Stack</h2>
        <div className={styles.stackGrid}>
          {STACK.map(s => (
            <div key={s.label} className={styles.stackItem}>
              <span className={styles.stackLabel}>{s.label}</span>
              <span className={styles.stackValue}>{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Team</h2>
        <div className={styles.teamGrid}>
          {TEAM.map((m, i) => (
            <div key={m.id} className={styles.memberCard} style={{ animationDelay: `${i * 80}ms` }}>
              <div className={styles.memberNum}>{String(i + 1).padStart(2, '0')}</div>
              <div className={styles.memberBody}>
                <div className={styles.memberName}>{m.name}</div>
                <div className={styles.memberId}>{m.id}</div>
                <div className={styles.memberRole}>{m.role}</div>
                <div className={styles.memberParts}>{m.parts}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Project Highlights</h2>
        <div className={styles.highlights}>
          <div className={styles.highlight}>
            <div className={styles.highlightNum}>18</div>
            <div className={styles.highlightLabel}>Games in catalog</div>
          </div>
          <div className={styles.highlight}>
            <div className={styles.highlightNum}>4</div>
            <div className={styles.highlightLabel}>Routed pages</div>
          </div>
          <div className={styles.highlight}>
            <div className={styles.highlightNum}>2</div>
            <div className={styles.highlightLabel}>Simultaneous filters</div>
          </div>
          <div className={styles.highlight}>
            <div className={styles.highlightNum}>7</div>
            <div className={styles.highlightLabel}>Sort options</div>
          </div>
        </div>
      </section>
    </div>
  )
}
