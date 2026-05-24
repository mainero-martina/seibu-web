import '../App.css'

function Hero() {
  return (
    <section id="hero">
      <div className="hero-tag">Buenos Aires — Argentina</div>
      <h1 className="hero-title">
        <span className="blue">SEIBU</span><br />
        PRODU<br className="mobile-break" />CCIONES
      </h1>
      <p className="hero-sub">Producción, creación y difusión de artes multimediales</p>
      <p className="hero-sub-en">Production, creation and diffusion of multimedia arts</p>
    </section>
  )
}

export default Hero