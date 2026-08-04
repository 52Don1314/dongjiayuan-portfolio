import useReveal from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" className="section" style={{ paddingBottom: 100 }}>
      <div className="container">
        <div
          ref={ref}
          className="reveal"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 28,
            padding: '64px 40px',
            textAlign: 'center',
            background:
              'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.18), transparent 60%)',
          }}
        >
          <div className="section-tag" style={{ margin: '0 auto 20px', width: 'fit-content' }}>
            05 · Contact
          </div>
          <h2 className="section-title">
            一起聊聊 <span className="highlight">AI × 增长</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto 36px' }}>
            无论是产品运营合作、实习内推还是灵感交流，欢迎联系我。
          </p>

          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:1325273916@qq.com"
              className="font-mono"
              style={{
                padding: '16px 32px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
                color: '#0b0b12',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              📧 1325273916@qq.com
            </a>
            <a
              href="tel:19944192003"
              className="font-mono"
              style={{
                padding: '16px 32px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                color: 'var(--ink)',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              📱 199 4419 2003
            </a>
          </div>

          <div style={{ marginTop: 32, fontSize: 13, color: 'var(--ink-dim)' }}>北京 · 常驻</div>
        </div>

        <div
          style={{
            textAlign: 'center',
            color: 'var(--ink-dim)',
            fontSize: 13,
            marginTop: 48,
          }}
          className="font-mono"
        >
          © 2026 董稼源 · Built with React + Vite
        </div>
      </div>
    </section>
  )
}
