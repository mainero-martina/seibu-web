import { useState } from 'react'
import './App.css'
import Led from './components/led'
import Nav from './components/nav'

import audioSeibu from './assets/SeibuCorp.mp3'
import seibuIcon from './assets/logo.jpg'

import igIcon from './assets/ig.png'
import mailIcon from './assets/mail.png'

import martinaMainero from './assets/martina_mainero.jpeg'
import solHerrera from './assets/sol_herrera.jpeg'
import pedroPontoriero from './assets/pedro_pontoriero.jpeg'


function App() {
  const reproducirAudio = () => {
    const audio = new Audio(audioSeibu)
    audio.play()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState(null, '', '/')  // ← esto limpia el hash
  }
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [equipoAbierto, setEquipoAbierto] = useState(false)
  const equipo = [
    {
      nombre: 'Nicolás Buffarini',
      rol: 'Gestión Cultural',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://www.instagram.com/nicobuffarini/',
      foto: null
    },

    {
      nombre: 'Julián González Garrido',
      rol: 'Dirección',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://www.instagram.com/nailujjjjjj/',
      foto: null
    },

    {
      nombre: 'Sol Herrera',
      rol: 'Gestión Digital',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://www.instagram.com/solherrera.ar/',
      foto: solHerrera
    },

    {
      nombre: 'Martina Mainero',
      rol: 'Dirección',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'maineromartina.proyectos@gmail.com',
      ig: 'https://instagram.com/mainero_martina', 
      foto: martinaMainero
    },

    {
      nombre: 'Mercedes Pallotti',
      rol: 'Técnica / Fotografía',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://www.instagram.com/mechipallotti/',
      foto: null
    },

    {
      nombre: 'Manuel Pemberton',
      rol: 'Técnica / Video',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://www.instagram.com/manupemberton/',
      foto: null
    },

    {
      nombre: 'Julieta Pla',
      rol: 'Rol / disciplina',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://instagram.com/jupla___/',
      foto: null
    },

    {
      nombre: 'Bautista Ponce de Leon',
      rol: 'Rol / disciplina',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://instagram.com/_bauiti/',
      foto: null
    },

    {
      nombre: 'Pedro Pontoriero Rojas',
      rol: 'Rol / disciplina',
      bio: 'Breve descripción de la persona y su trabajo dentro del colectivo.',
      mail: 'email@ejemplo.com',
      ig: 'https://instagram.com/_pontofview/',
      foto: pedroPontoriero
    }]

  return (
    <>
       <Nav />
      {/*} <Led />*/}
      <section id="hero">
        <div className="hero-tag">Buenos Aires — Argentina</div>
        <h1 className="hero-title">
          <span className="blue">SEIBU</span><br />
          PRODU<br className="mobile-break" />CCIONES
        </h1>
        <p className="hero-sub">Producción, creación y difusión de artes multimediales</p>
        <p className="hero-sub-en">Production, creation and diffusion of multimedia arts</p>
      </section>

      <section id="nosotros">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2>Quiénes somos<br /><span className="blue">Who we are</span></h2>
        </div>
        <div className="about-body">
          <p>Somos un grupo de amigos que produce, gestiona y difunde artes multimediales desde Buenos Aires. Hacemos obra, generamos eventos y conectamos la escena.</p>
          <p className="en">We are a group of friends who produce, manage and diffuse multimedia arts from Buenos Aires. We make work, generate events and connect the scene.</p>
        </div>

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
                style={persona.foto ? { backgroundImage: `url(${persona.foto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
              <div className="persona-info">
                <h3>{persona.nombre}</h3>
                <div className="cuadrado-info">
                  <span className="persona-rol">{persona.rol}</span>
                  <p>{persona.bio}</p>
                  <span className="persona-contacto">
                    {persona.mail && (
                      <div className="persona-contacto">
                        <a href={persona.ig} target="_blank">
                          <img src={igIcon} alt="Instagram" />
                        </a>
                        <a href={`mailto:${persona.mail}`}>
                          <img src={mailIcon} alt="Mail" />
                        </a>
                      </div>
                    )}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="proyectos">
        <div className="section-header">
          <span className="section-num">02</span>
          <h2>Proyectos<br /><span className="blue">Projects</span></h2>
        </div>
        <div className="proyectos-grid">
          <div className="proyecto-card">
            <span className="card-tag">Taller / Workshop</span>
            <h3>Electrónica para artistas</h3>
            <p>Taller de electrónica orientado a artistas visuales y músicos.</p>
          </div>
          <div className="proyecto-card">
            <span className="card-tag">Performance</span>
            <h3>Visuales reactivas en vivo</h3>
            <p>Visuales generativas para fechas y eventos musicales.</p>
          </div>
          <div className="proyecto-card">
            <span className="card-tag">Exposición / Exhibition</span>
            {/*} <h3>Exposición Multimedial</h3>
            <p>Muestra de una noche en Espacio Beruti. 10 artistas, DJs, vernisage.</p>*/}
          </div>
        </div>
      </section>

      <section id="revista">
        <div className="section-header">
          <span className="section-num">03</span>
          <h2>Revista<br /><span className="blue">Magazine</span></h2>
        </div>
        <div className="revista-body">
          <p>Publicación digital propia. Entrevistas a artistas y técnicos. Coberturas de muestras y eventos de la escena multimedial porteña.</p>
          <p className="en">Our own digital publication. Interviews with artists and technicians. Coverage of exhibitions and events from the Buenos Aires multimedia scene.</p>
          <span className="revista-pronto">Próximamente / Coming soon</span>
        </div>
      </section>

      <section id="contacto">
        <div className="section-header">
          <span className="section-num">04</span>
          <h2>Contacto<br /><span className="blue">Contact</span></h2>
        </div>
        <div className="contacto-body">
          <a href="mailto:seibu@seibu.com.ar" className="contacto-mail">
            seibu@seibu.com.ar
          </a>
          <a href="https://instagram.com/seibu.corp" target="_blank" className="contacto-ig">
            @seibuproducciones
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Seibu Producciones — Buenos Aires</span>
      </footer>
    </>
  )
}

export default App