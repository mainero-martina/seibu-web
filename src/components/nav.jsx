import { useState } from 'react'
import seibuIcon from '../assets/logo.png'
import audioSeibu from '../assets/SeibuCorp.mp3'


function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const reproducirAudio = () => {
    const audio = new Audio(audioSeibu)
    audio.play()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState(null, '', '/')
  }

  return (
    <nav className="nav">
      <span className="nav-logo" onClick={reproducirAudio}>
        <img src={seibuIcon} alt="Seibu" className="nav-logo-img" />
      </span>
      <button className="hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? '×' : '+'}
      </button>
      <ul className={`nav-links ${menuAbierto ? 'menu-abierto' : ''}`}>
        <li><a href="#nosotros" onClick={() => setMenuAbierto(false)}>Nosotros / About</a></li>
        <li><a href="#proyectos" onClick={() => setMenuAbierto(false)}>Proyectos / Projects</a></li>
       {/* <li><a href="#revista" onClick={() => setMenuAbierto(false)}>Revista / Magazine</a></li> */}
        <li><a href="#contacto" onClick={() => setMenuAbierto(false)}>Contacto / Contact</a></li>
      </ul>
    </nav>
  )
}

export default Nav