import { useState } from 'react'
import { supabase } from '../../lib/supabase.js'

export default function ImageUploader({ value, onChange, label = '上传图片' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage.from('images').upload(path, file)
      if (upErr) throw upErr
      const { data } = supabase.storage.from('images').getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err) {
      setError(err.message || '上传失败')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label style={{ fontSize: 13, color: '#a9a6c4' }}>{label}</label>
      {value && (
        <img
          src={value}
          alt="preview"
          style={{ maxWidth: 200, borderRadius: 8, border: '1px solid rgba(244,242,255,0.14)' }}
        />
      )}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
      {uploading && <span style={{ fontSize: 12, color: '#22e8c8' }}>上传中...</span>}
      {error && <span style={{ fontSize: 12, color: '#ff3d81' }}>{error}</span>}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{
            justifySelf: 'start',
            fontSize: 12,
            color: '#ff3d81',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          移除图片
        </button>
      )}
    </div>
  )
}
