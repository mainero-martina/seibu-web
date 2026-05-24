import '../App.css'

import { proyectos } from '../data/proyectos'

function Proyectos() {
  return (
    <section id="proyectos">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2>Proyectos<br /><span className="blue">Projects</span></h2>
      </div>
      <div className="proyectos-grid">
        {proyectos.map((proyecto, i) => (
          <div className="proyecto-card" key={i}>
            <span className="card-tag">{proyecto.tag}</span>
            {proyecto.titulo && <h3>{proyecto.titulo}</h3>}
            {proyecto.descripcion && <p>{proyecto.descripcion}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Proyectos