import useReveal from '../hooks/useReveal'

const GROUPS = [
  {
    title: 'AI 工具应用',
    color: 'var(--cyan)',
    items: ['ChatGPT', 'Claude', 'Kimi', '豆包', 'Sora 2.0', 'Seedance', 'Prompt工程'],
  },
  {
    title: '数据与分析',
    color: 'var(--purple)',
    items: ['漏斗分析', '意图识别', '聚类分析', 'NLP情感分析', '归因分析', 'Office数据分析'],
  },
  {
    title: '运营与增长',
    color: 'var(--orange)',
    items: ['私域运营', '社群裂变', '活动策划', '渠道拓展', '指标体系搭建', 'SOP沉淀'],
  },
  {
    title: '效率工具',
    color: 'var(--pink)',
    items: ['WPS AI', '稿定设计', '播音主持', '摄影文案'],
  },
]

export default function Skills() {
  const ref = useReveal()
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-tag">03 · Skills</div>
        <h2 className="section-title">
          技能<span className="highlight">矩阵</span>
        </h2>
        <p className="section-sub">
          AI 产品运营专家，深耕 LLM 应用落地与商业化，擅长在技术团队与终端用户之间搭建数据闭环桥梁。
        </p>

        <div
          ref={ref}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {GROUPS.map((g) => (
            <div
              key={g.title}
              style={{
                border: `1px solid ${g.color}33`,
                borderRadius: 20,
                padding: 24,
                background: `linear-gradient(160deg, ${g.color}14, transparent)`,
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 16px', color: g.color }}>
                {g.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="font-mono"
                    style={{
                      fontSize: 13,
                      padding: '6px 12px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      color: 'var(--ink)',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
