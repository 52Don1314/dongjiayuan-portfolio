import useReveal from '../hooks/useReveal'
import CountUp from './CountUp.jsx'

const STATS = [
  { num: '3,427', unit: '人', label: 'CatPaw 首周跨端去重用户', color: 'var(--cyan)' },
  { num: '44.2', unit: '%', label: '单日活跃率，覆盖五端', color: 'var(--purple)' },
  { num: '853', unit: '+', label: '定位的外网沙箱增长因子', color: 'var(--orange)' },
  { num: '92', unit: '条', label: 'AI知识库高频FAQ条目', color: 'var(--pink)' },
  { num: '120', unit: '万', label: '统筹产品推广预算', color: 'var(--yellow)' },
  { num: '48', unit: '小时', label: '完成92条用户需求处理', color: 'var(--cyan)' },
]

export default function Highlights() {
  const ref = useReveal()
  return (
    <section id="highlights" className="section">
      <div className="container">
        <div className="section-tag">04 · Highlights</div>
        <h2 className="section-title">
          用<span className="highlight">数字</span>说话
        </h2>
        <p className="section-sub">数据驱动增长闭环，是我做 AI 产品运营的核心方法论。</p>

        <div
          ref={ref}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 1,
            border: '1px solid var(--border)',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: 'var(--bg-soft)',
                padding: '32px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                <CountUp
                  value={s.num}
                  className="font-mono"
                  style={{ fontSize: 40, fontWeight: 700, color: s.color }}
                />
                <span className="font-mono" style={{ fontSize: 18, color: s.color }}>
                  {s.unit}
                </span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
