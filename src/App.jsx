import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Highlights from './components/Highlights.jsx'
import Contact from './components/Contact.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { useSiteData } from './hooks/useSiteData.js'
import { applyTheme } from './utils/applyTheme.js'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function HomePage() {
  const { experiences, config, theme } = useSiteData()

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <Hero config={config} />
        <About />
        <Experience items={experiences} />
        <Skills />
        <Highlights />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
