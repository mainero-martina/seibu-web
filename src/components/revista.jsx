import '../App.css'

function Revista() {
  return (
    <section id="revista">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2>Revista<br /><span className="blue">Magazine</span></h2>
      </div>
      <div className="revista-body">
        <p>Publicación digital propia. Entrevistas a artistas y técnicos. Coberturas de muestras y eventos de la escena multimedial.</p>
        <p className="en">Our own digital publication. Interviews with artists and technicians. Coverage of exhibitions and events from the multimedia scene.</p>
        <span className="revista-pronto">Próximamente / Coming soon</span>
      </div>
    </section>
  )
}

export default Revista