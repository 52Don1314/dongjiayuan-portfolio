import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Highlights from './components/Highlights.jsx'
import Contact from './components/Contact.jsx'
import CursorGlow from './components/CursorGlow.jsx'

export default function App() {
  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Highlights />
        <Contact />
      </main>
    </>
  )
}
