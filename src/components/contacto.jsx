import '../App.css'


function Contacto() {
  return (
    <section id="contacto">
      <div className="section-header">
        <span className="section-num">04</span>
        <h2>Contacto<br /><span className="blue">Contact</span></h2>
      </div>
      <div className="contacto-body">
        <a href="mailto:seibu@seibu.com.ar" className="contacto-mail">
          seibu@seibu.com.ar
        </a>
        <a href="https://instagram.com/seibu.corp" target="_blank" rel="noreferrer" className="contacto-ig">
          @seibuproducciones
        </a>
      </div>
            <footer className="footer">
        <span>© 2026 Seibu Producciones — Buenos Aires</span>
      </footer>
    </section>
    
  )
}

export default Contacto