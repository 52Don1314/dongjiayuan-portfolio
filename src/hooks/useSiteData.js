import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const DEFAULT_THEME = {
  purple: '#8b5cf6',
  cyan: '#22e8c8',
  orange: '#ff7a45',
  pink: '#ff3d81',
  yellow: '#ffd23f',
}

export function useSiteData() {
  const [experiences, setExperiences] = useState([])
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    const [expRes, cfgRes] = await Promise.all([
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_config').select('*').eq('id', 1).single(),
    ])
    if (!expRes.error) setExperiences(expRes.data || [])
    if (!cfgRes.error) setConfig(cfgRes.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const theme = config?.theme || DEFAULT_THEME

  return { experiences, config, theme, loading, reload }
}
