import { useState } from 'react'
import { equipo } from '../data/equipo'
import EquipoRed from './EquipoRed'
import '../App.css'

function Equipo() {
  const [equipoAbierto, setEquipoAbierto] = useState(false)
  const [transicionTerminada, setTransicionTerminada] = useState(false)

  const toggleEquipo = () => {
    if (equipoAbierto) {
      // se está cerrando: oculta el overflow de una para que no se vea nada raro
      setTransicionTerminada(false)
    }
    setEquipoAbierto(!equipoAbierto)
  }

  return (
    <>
      <section id="nosotros">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2>Quiénes somos<br /><span className="blue">Who we are</span></h2>
        </div>
        <div className="about-body">
          <p>Somos un grupo de artistas y amigos que produce, gestiona y difunde artes multimediales desde Buenos Aires. Hacemos obras, generamos eventos y conectamos la escena.</p>
          <p className="en">We are a group of artist and friends who produce, manage and diffuse multimedia arts from Buenos Aires. We make art, generate events and connect the scene.</p>
        </div>
      </section>

      <button
        className={`equipo-toggle ${equipoAbierto ? 'abierto' : ''}`}
        onClick={toggleEquipo}
      >
        <span>El equipo / The team</span>
        <span className="equipo-arrow">{equipoAbierto ? '−' : '+'}</span>
      </button>

      <div
        className={`equipo-grid ${equipoAbierto ? 'visible' : ''} ${transicionTerminada ? 'sin-recorte' : ''}`}
        onTransitionEnd={() => {
          if (equipoAbierto) setTransicionTerminada(true)
        }}
      >
        <EquipoRed equipo={equipo} />
      </div>
    </>
  )
}

export default Equipo