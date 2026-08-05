import { useMemo, useState } from 'react'
import useReveal from '../hooks/useReveal'

const TABS = ['全部', '实习经历', '项目经历', '实践经历', '教育经历']

export default function Experience({ items = [] }) {
  const ref = useReveal()
  const [active, setActive] = useState('全部')

  const filtered = useMemo(
    () => (active === '全部' ? items : items.filter((it) => it.tag === active)),
    [active, items]
  )

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-tag">02 · Experience</div>
        <h2 className="section-title">
          一路<span className="highlight">增长</span>的
          <br />
          实战履历
        </h2>
        <p className="section-sub">
          从校园渠道运营到大厂 AI 产品运营，始终围绕「数据驱动增长」这条主线。
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
          {TABS.map((tab) => {
            const isActive = tab === active
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="font-mono"
                style={{
                  cursor: 'pointer',
                  fontSize: 13,
                  padding: '9px 18px',
                  borderRadius: 999,
                  border: isActive ? '1px solid transparent' : '1px solid var(--border)',
                  background: isActive
                    ? 'linear-gradient(90deg, var(--cyan), var(--purple))'
                    : 'transparent',
                  color: isActive ? '#0b0b12' : 'var(--ink-dim)',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div
          ref={ref}
          className="reveal"
          style={{
            position: 'relative',
            paddingLeft: 28,
            borderLeft: '2px dashed var(--border)',
          }}
        >
          {filtered.map((item, i) => (
            <div key={item.id} style={{ position: 'relative', marginBottom: i === filtered.length - 1 ? 0 : 48 }}>
              <div
                style={{
                  position: 'absolute',
                  left: -34,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 0 4px ${item.color}22`,
                }}
              />
              <div
                className="font-mono"
                style={{ fontSize: 13, color: item.color, marginBottom: 8, letterSpacing: '0.05em' }}
              >
                {item.tag} · {item.time}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{item.org}</h3>
              <div style={{ fontSize: 15, color: 'var(--ink-dim)', marginBottom: 14 }}>{item.role}</div>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.org}
                  style={{
                    maxWidth: '100%',
                    borderRadius: 12,
                    marginBottom: 14,
                    border: '1px solid var(--border)',
                  }}
                />
              )}
              <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
                {(item.points || []).map((p, j) => (
                  <li key={j} style={{ color: '#d7d5e8', lineHeight: 1.75, fontSize: 15 }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
