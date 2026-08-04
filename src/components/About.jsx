import useReveal from '../hooks/useReveal'

const CARDS = [
  {
    color: 'var(--cyan)',
    title: '数据驱动',
    desc: '擅长漏斗分析、意图识别与聚类，用数据定位增长因子，输出归因分析报告。',
  },
  {
    color: 'var(--purple)',
    title: 'AI 落地',
    desc: '深耕 LLM 应用与商业化，精通 Prompt 工程，把模型能力转译为业务语言。',
  },
  {
    color: 'var(--orange)',
    title: '增长实操',
    desc: '400+ 场校园活动策划执行经验，擅长私域运营、社群裂变与渠道拓展。',
  },
]

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-tag">01 · About</div>
        <h2 className="section-title">
          把 AI 能力，<br />
          翻译成<span className="highlight">业务结果</span>
        </h2>
        <p className="section-sub">
          兰州交通大学市场营销专业在读，GPA 前 20%。抗压能力强，具备私域增长与活动运营实操经验，
          擅长校园渠道拓展；深耕 AI 产品运营方向，持续驱动效率提升与数据增长，赋能团队数字化转型升级。
        </p>

        <div
          ref={ref}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              style={{
                background: 'var(--bg-soft)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 28,
                transform: `rotate(${i % 2 === 0 ? -1.2 : 1.2}deg)`,
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg) translateY(-6px)')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1.2 : 1.2}deg)`)
              }
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: c.color,
                  marginBottom: 20,
                  opacity: 0.9,
                }}
              />
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>{c.title}</h3>
              <p style={{ color: 'var(--ink-dim)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
