import { useState } from 'react'
import { equipo } from '../data/equipo'
import igIcon from '../assets/ig.png'
import mailIcon from '../assets/mail.png'
import '../App.css'

function Equipo() {
  const [equipoAbierto, setEquipoAbierto] = useState(false)

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
        onClick={() => setEquipoAbierto(!equipoAbierto)}
      >
        <span>El equipo / The team</span>
        <span className="equipo-arrow">{equipoAbierto ? '−' : '+'}</span>
      </button>

      <div className={`equipo-grid ${equipoAbierto ? 'visible' : ''}`}>
        {equipo.map((persona, i) => (
          <div className="persona-card" key={i}>
            <div
              className="persona-foto"
              style={persona.foto ? {
                backgroundImage: `url(${persona.foto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            />
            <div className="persona-info">
              <h3>{persona.nombre}</h3>
              <div className="cuadrado-info">
                <span className="persona-rol">{persona.rol}</span>
                <p>{persona.bio}</p>
                {persona.mail && (
                  <div className="persona-contacto">
                    <a href={persona.ig} target="_blank" rel="noreferrer">
                      <img src={igIcon} alt="Instagram" />
                    </a>
                    <a href={`mailto:${persona.mail}`}>
                      <img src={mailIcon} alt="Mail" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Equipo