import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useSiteData } from '../hooks/useSiteData.js'
import { supabase } from '../lib/supabase.js'
import ImageUploader from '../components/admin/ImageUploader.jsx'

const TAGS = ['实习经历', '项目经历', '实践经历', '教育经历']
const EMPTY_ITEM = {
  tag: '实习经历',
  time: '',
  org: '',
  role: '',
  points: [''],
  color: '#22e8c8',
  image_url: '',
  sort_order: 0,
}

export default function AdminDashboard() {
  const { session, signOut, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { experiences, config, reload } = useSiteData()
  const [editing, setEditing] = useState(null)
  const [themeForm, setThemeForm] = useState(null)
  const [heroForm, setHeroForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!authLoading && !session) navigate('/admin/login')
  }, [authLoading, session, navigate])

  useEffect(() => {
    if (config) {
      setThemeForm(config.theme)
      setHeroForm({
        hero_title: config.hero_title,
        hero_subtitle: config.hero_subtitle,
        hero_desc: config.hero_desc,
        stats: config.stats?.length ? config.stats : [],
      })
    }
  }, [config])

  const flash = (text) => {
    setMsg(text)
    setTimeout(() => setMsg(''), 2500)
  }

  const saveExperience = async () => {
    setSaving(true)
    const payload = { ...editing, points: editing.points.filter((p) => p.trim()) }
    const { id, ...rest } = payload
    const res = id
      ? await supabase.from('experiences').update(rest).eq('id', id)
      : await supabase.from('experiences').insert(rest)
    setSaving(false)
    if (res.error) {
      flash('保存失败：' + res.error.message)
      return
    }
    flash('保存成功')
    setEditing(null)
    reload()
  }

  const deleteExperience = async (id) => {
    if (!confirm('确认删除这条经历吗？')) return
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (error) {
      flash('删除失败：' + error.message)
      return
    }
    flash('已删除')
    reload()
  }

  const saveTheme = async () => {
    setSaving(true)
    const { error } = await supabase.from('site_config').update({ theme: themeForm }).eq('id', 1)
    setSaving(false)
    flash(error ? '保存失败：' + error.message : '主题已更新')
    reload()
  }

  const saveHero = async () => {
    setSaving(true)
    const { error } = await supabase.from('site_config').update(heroForm).eq('id', 1)
    setSaving(false)
    flash(error ? '保存失败：' + error.message : 'Hero 内容已更新')
    reload()
  }

  if (authLoading || !session) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0b0b12', color: '#f4f2ff', padding: '32px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 26 }}>网站后台管理</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/" style={{ color: '#22e8c8', fontSize: 14 }}>
              查看网站 →
            </a>
            <button onClick={signOut} style={btnGhost}>
              退出登录
            </button>
          </div>
        </div>

        {msg && (
          <div style={{ padding: '10px 16px', background: 'rgba(34,232,200,0.1)', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
            {msg}
          </div>
        )}

        {/* 主题配色 */}
        <section style={cardStyle}>
          <h2 style={h2Style}>主题配色</h2>
          {themeForm && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                {Object.keys(themeForm).map((key) => (
                  <div key={key} style={{ display: 'grid', gap: 6 }}>
                    <label style={{ fontSize: 13, color: '#a9a6c4', textTransform: 'capitalize' }}>{key}</label>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="color"
                        value={themeForm[key]}
                        onChange={(e) => setThemeForm({ ...themeForm, [key]: e.target.value })}
                        style={{ width: 40, height: 36, border: 'none', borderRadius: 6, background: 'none' }}
                      />
                      <input
                        value={themeForm[key]}
                        onChange={(e) => setThemeForm({ ...themeForm, [key]: e.target.value })}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={saveTheme} disabled={saving} style={btnPrimary}>
                保存配色
              </button>
            </>
          )}
        </section>

        {/* Hero 文案 */}
        <section style={cardStyle}>
          <h2 style={h2Style}>首页 Hero 文案</h2>
          {heroForm && (
            <div style={{ display: 'grid', gap: 14 }}>
              <input
                placeholder="标题（如：董稼源）"
                value={heroForm.hero_title || ''}
                onChange={(e) => setHeroForm({ ...heroForm, hero_title: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="副标题（如：AI Product Growth Operator）"
                value={heroForm.hero_subtitle || ''}
                onChange={(e) => setHeroForm({ ...heroForm, hero_subtitle: e.target.value })}
                style={inputStyle}
              />
              <textarea
                placeholder="简介文案"
                value={heroForm.hero_desc || ''}
                onChange={(e) => setHeroForm({ ...heroForm, hero_desc: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <label style={{ fontSize: 13, color: '#a9a6c4' }}>数据卡片（首屏展示的关键数字）</label>
              {(heroForm.stats || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <input
                    placeholder="数字，如 92"
                    value={s.num}
                    onChange={(e) => {
                      const stats = [...heroForm.stats]
                      stats[i] = { ...stats[i], num: e.target.value }
                      setHeroForm({ ...heroForm, stats })
                    }}
                    style={{ ...inputStyle, width: 120 }}
                  />
                  <input
                    placeholder="说明文字"
                    value={s.label}
                    onChange={(e) => {
                      const stats = [...heroForm.stats]
                      stats[i] = { ...stats[i], label: e.target.value }
                      setHeroForm({ ...heroForm, stats })
                    }}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    onClick={() => setHeroForm({ ...heroForm, stats: heroForm.stats.filter((_, idx) => idx !== i) })}
                    style={btnGhost}
                  >
                    删除
                  </button>
                </div>
              ))}
              <button
                onClick={() => setHeroForm({ ...heroForm, stats: [...(heroForm.stats || []), { num: '', label: '' }] })}
                style={{ ...btnGhost, justifySelf: 'start' }}
              >
                + 新增数据卡片
              </button>
              <button onClick={saveHero} disabled={saving} style={btnPrimary}>
                保存 Hero 内容
              </button>
            </div>
          )}
        </section>

        {/* 经历管理 */}
        <section style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={h2Style}>经历管理</h2>
            <button onClick={() => setEditing({ ...EMPTY_ITEM })} style={btnPrimary}>
              + 新增经历
            </button>
          </div>

          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            {experiences.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  border: '1px solid rgba(244,242,255,0.14)',
                  borderRadius: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: item.color }}>
                    {item.tag} · {item.time}
                  </div>
                  <div style={{ fontWeight: 700 }}>{item.org}</div>
                  <div style={{ fontSize: 13, color: '#a9a6c4' }}>{item.role}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setEditing({ ...item, points: item.points?.length ? item.points : [''] })} style={btnGhost}>
                    编辑
                  </button>
                  <button onClick={() => deleteExperience(item.id)} style={{ ...btnGhost, color: '#ff3d81' }}>
                    删除
                  </button>
                </div>
              </div>
            ))}
            {experiences.length === 0 && <div style={{ color: '#a9a6c4', fontSize: 14 }}>暂无经历，点击右上角新增</div>}
          </div>
        </section>

        {/* 编辑弹层 */}
        {editing && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: 20,
            }}
          >
            <div style={{ ...cardStyle, width: 520, maxHeight: '85vh', overflowY: 'auto', margin: 0 }}>
              <h2 style={h2Style}>{editing.id ? '编辑经历' : '新增经历'}</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                <select
                  value={editing.tag}
                  onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                  style={inputStyle}
                >
                  {TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="时间范围，如 2026.06 - 至今"
                  value={editing.time}
                  onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                  style={inputStyle}
                />
                <input
                  placeholder="机构/公司名"
                  value={editing.org}
                  onChange={(e) => setEditing({ ...editing, org: e.target.value })}
                  style={inputStyle}
                />
                <input
                  placeholder="职位/角色"
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  style={inputStyle}
                />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <label style={{ fontSize: 13, color: '#a9a6c4' }}>时间线颜色</label>
                  <input
                    type="color"
                    value={editing.color}
                    onChange={(e) => setEditing({ ...editing, color: e.target.value })}
                  />
                </div>

                <ImageUploader
                  label="配图（可选）"
                  value={editing.image_url}
                  onChange={(url) => setEditing({ ...editing, image_url: url })}
                />

                <label style={{ fontSize: 13, color: '#a9a6c4' }}>要点描述</label>
                {editing.points.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8 }}>
                    <textarea
                      value={p}
                      onChange={(e) => {
                        const points = [...editing.points]
                        points[i] = e.target.value
                        setEditing({ ...editing, points })
                      }}
                      rows={2}
                      style={{ ...inputStyle, flex: 1, resize: 'vertical' }}
                    />
                    <button
                      onClick={() => setEditing({ ...editing, points: editing.points.filter((_, idx) => idx !== i) })}
                      style={btnGhost}
                    >
                      删除
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setEditing({ ...editing, points: [...editing.points, ''] })}
                  style={{ ...btnGhost, justifySelf: 'start' }}
                >
                  + 新增要点
                </button>

                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  <button onClick={saveExperience} disabled={saving} style={btnPrimary}>
                    保存
                  </button>
                  <button onClick={() => setEditing(null)} style={btnGhost}>
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const cardStyle = {
  border: '1px solid rgba(244,242,255,0.14)',
  borderRadius: 20,
  padding: 24,
  marginBottom: 24,
  background: '#131320',
}
const h2Style = { fontSize: 18, margin: '0 0 16px' }
const inputStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(244,242,255,0.14)',
  background: '#0b0b12',
  color: '#f4f2ff',
  fontSize: 14,
  outline: 'none',
  width: '100%',
}
const btnPrimary = {
  padding: '10px 20px',
  borderRadius: 999,
  border: 'none',
  background: 'linear-gradient(90deg, #22e8c8, #8b5cf6)',
  color: '#0b0b12',
  fontWeight: 700,
  cursor: 'pointer',
  marginTop: 16,
}
const btnGhost = {
  padding: '8px 16px',
  borderRadius: 999,
  border: '1px solid rgba(244,242,255,0.14)',
  background: 'none',
  color: '#f4f2ff',
  cursor: 'pointer',
  fontSize: 13,
}
