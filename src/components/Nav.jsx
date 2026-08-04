import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#about', label: '关于我' },
  { href: '#experience', label: '经历' },
  { href: '#skills', label: '技能' },
  { href: '#highlights', label: '数据成果' },
  { href: '#contact', label: '联系' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '14px 0' : '24px 0',
        background: scrolled ? 'rgba(11,11,18,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <a
          href="#top"
          className="font-mono"
          style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}
        >
          董稼源<span style={{ color: 'var(--cyan)' }}>.</span>
        </a>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono"
              style={{
                fontSize: 14,
                color: 'var(--ink-dim)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-dim)')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="./董稼源_AI产品运营_北京.pdf"
            download
            className="font-mono"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#0b0b12',
              background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
              padding: '8px 18px',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            下载简历 ↓
          </a>
        </div>
      </div>
    </nav>
  )
}
