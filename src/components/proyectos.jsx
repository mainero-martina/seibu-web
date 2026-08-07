import '../App.css'
import { useState } from 'react'

import { proyectos } from '../data/proyectos'
import basesYCondiciones from '../assets/bases-y-condiciones.pdf'

function Proyectos() {
  const [convocatoriaAbierta, setConvocatoriaAbierta] = useState(false)

  return (
    <section id="proyectos">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2>Proyectos<br /><span className="blue">Projects</span></h2>
      </div>
      <div className="proyectos-grid">
        {proyectos.map((proyecto, i) => {
          const esConvocatoria = proyecto.tag === 'EVENTO: MOSTRAR EL MOTOR'

          return (
            <div
              className={`proyecto-card ${esConvocatoria ? 'proyecto-clickeable' : ''}`}
              key={i}
              onClick={esConvocatoria ? () => setConvocatoriaAbierta(!convocatoriaAbierta) : undefined}
            >
              <span className="card-tag">
                {proyecto.tag}
                {esConvocatoria && (
                  <span className="convocatoria-arrow">{convocatoriaAbierta ? '−' : '+'}</span>
                )}
              </span>
              {proyecto.titulo && <h3>{proyecto.titulo}</h3>}
              {proyecto.descripcion && <p>{proyecto.descripcion}</p>}

              {esConvocatoria && (
                <div className={`convocatoria-panel ${convocatoriaAbierta ? 'visible' : ''}`}>
                  <h4 className="convocatoria-titulo">Convocatoria abierta</h4>
                  <p className="convocatoria-texto">
                    SEIBU abre convocatoria para su próxima muestra de arte multimedial. 
                    <br />
                    Buscamos obras que muestren el motor que nos mueve — el que es máquina y el que es cuerpo.
                    <br />
                    🪜 Espacio Beruti, Chacarita
                    <br />
                    🫆Exposición: 26.09.2026
                   <br />
                    🛠️Cierre de convocatoria: 31.08.2026
                   <br />
                    Abierto a artistas de cualquier región del país, individuales o colectivos, mayores de 18 años.
                    <br />
                    Es excluyente estar en CABA para las fechas de montaje, muestra y desmontaje: 24.08.2026 al 27.08.2026.
                    <br />
                    ¿Cómo aplicar? Despues de leer las bases y condiciones, completa el formulario. Muchos SEIBU exitos.
                  </p>
                  <div className="convocatoria-links">
                    

                    <a href={basesYCondiciones} download className="convocatoria-link" onClick={(e) => e.stopPropagation()}>
                    Descargar bases y condiciones 
                    </a>
                    
                  
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9Uf4wHJTI0FgtyCVVjMMZYHb23zz0RnlhZTLDbOXnyD4Xfg/viewform" target="_blank" rel="noreferrer" className="convocatoria-link" onClick={(e) => e.stopPropagation()}>
                    Ir al formulario 
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Proyectos