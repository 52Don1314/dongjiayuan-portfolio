export function applyTheme(theme) {
  if (!theme) return
  const root = document.documentElement
  Object.entries(theme).forEach(([key, value]) => {
    if (value) root.style.setProperty(`--${key}`, value)
  })
}
