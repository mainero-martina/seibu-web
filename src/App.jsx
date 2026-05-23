import './App.css'
import audioSeibu from './assets/SeibuCorp.mp3'

function App() {
  const reproducirAudio = () => {
    const audio = new Audio(audioSeibu)
    audio.play()
    window.scrollTo({ top: 0, behavior: 'smooth' })
     window.history.pushState(null, '', '/')  // ← esto limpia el hash
  }

  return (
    <>
      <nav className="nav">
        <span className="nav-logo" onClick={reproducirAudio}>SEIBU corp</span>
        <ul className="nav-links">
          <li><a href="#nosotros">Nosotros / About</a></li>
          <li><a href="#proyectos">Proyectos / Projects</a></li>
          <li><a href="#revista">Revista / Magazine</a></li>
          <li><a href="#contacto">Contacto / Contact</a></li>
        </ul>
      </nav>

      <section id="hero">
        <div className="hero-tag">Argetina — Multimedia</div>
        <h1 className="hero-title">
          <span className="blue">SEIBU corp</span><br />
          PRODUCCIONES
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
          <p>Somos un grupo de artistas y amigos que produce, gestiona y difunde artes multimediales desde Buenos Aires. Hacemos obra, generamos eventos y conectamos la escena.</p>
          <p className="en">We are a group of artists and friends who produce, manage and diffuse multimedia arts from Buenos Aires. We make work, generate events and connect the scene.</p>
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