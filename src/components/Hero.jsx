import CountUp from './CountUp.jsx'

const DEFAULT_STATS = [
  { num: '92', label: '高频FAQ知识条目' },
  { num: '3,427', label: '首周跨端去重用户' },
  { num: '853+', label: '外网沙箱增长因子' },
  { num: '120万', label: '产品推广预算统筹' },
]

export default function Hero({ config }) {
  const title = config?.hero_title || '董稼源'
  const subtitle = config?.hero_subtitle || 'AI Product Growth Operator'
  const desc =
    config?.hero_desc ||
    '在美团 Agent 平台部深耕 AI 产品运营，擅长把大模型能力翻译成业务语言——从 0 到 1 搭建知识库体系，用漏斗分析驱动增长，用数据闭环驱动产品迭代。'
  const stats = config?.stats?.length ? config.stats : DEFAULT_STATS
  const subtitleParts = subtitle.split(' ')

  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 80,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(600px circle at 15% 20%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(500px circle at 85% 70%, rgba(34,232,200,0.18), transparent 60%)',
          zIndex: 0,
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-tag">● Open to Work · AI Product Growth</div>

        <h1
          style={{
            fontSize: 'clamp(48px, 9vw, 108px)',
            fontWeight: 900,
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            margin: '0 0 24px',
          }}
        >
          {title}
          <br />
          <span className="highlight">{subtitleParts.slice(0, -2).join(' ') || subtitleParts[0]}</span>
          <br />
          {subtitleParts.slice(-2).join(' ')}
        </h1>

        <p
          style={{
            fontSize: 19,
            color: 'var(--ink-dim)',
            maxWidth: 600,
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          {desc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <a
            href="#contact"
            className="font-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 999,
              background: 'linear-gradient(90deg, var(--purple), var(--pink))',
              color: '#0b0b12',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(139,92,246,0.35)',
            }}
          >
            联系我 →
          </a>
          <a
            href="#experience"
            className="font-mono"
            style={{
              padding: '14px 28px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              color: 'var(--ink)',
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            查看经历
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 72,
            flexWrap: 'wrap',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <CountUp
                value={s.num}
                className="font-mono"
                style={{ fontSize: 32, fontWeight: 700, color: 'var(--cyan)' }}
              />
              <div style={{ fontSize: 13, color: 'var(--ink-dim)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
