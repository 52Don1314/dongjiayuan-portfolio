import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError('登录失败：邮箱或密码错误')
      return
    }
    navigate('/admin')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b12',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 340,
          padding: 32,
          borderRadius: 20,
          border: '1px solid rgba(244,242,255,0.14)',
          background: '#131320',
          display: 'grid',
          gap: 16,
        }}
      >
        <h2 style={{ color: '#f4f2ff', margin: 0, fontSize: 22 }}>后台登录</h2>
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error && <div style={{ color: '#ff3d81', fontSize: 13 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 0',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(90deg, #22e8c8, #8b5cf6)',
            color: '#0b0b12',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid rgba(244,242,255,0.14)',
  background: '#0b0b12',
  color: '#f4f2ff',
  fontSize: 14,
  outline: 'none',
}
