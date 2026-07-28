// src/components/EquipoRed.jsx
import { useMemo, useState } from 'react'
import igIcon from '../assets/ig.png'
import mailIcon from '../assets/mail.png'

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------

const ANGULO_DORADO = 137.508 * (Math.PI / 180)

const COLORES_NODO = [
  'var(--azul-profundo)',
  'var(--violeta)',
  'var(--rojo)',
  'var(--amarillo)',
  'var(--mauve)',
  'var(--azul-claro)',
  'var(--gris-azulado)',
]

// Layout en abanico: nace cerca de abajo-izquierda y se despliega hacia
// la derecha (y un poco hacia arriba), en vez de una espiral centrada.
const LAYOUT = {
  origenX: 12,
  origenY: 70,
  anguloInicio: -95 * (Math.PI / 180), // apunta casi hacia arriba
  anguloRango: 105 * (Math.PI / 180), // barre hasta casi horizontal-derecha
  radioX: 80,
  radioY: 55,
}

// Cuántos quiebres puede tener una pista real vs. una decorativa, qué tan
// grande es el radio de cada esquina (chaflan) y qué tan curva se ve
// (curvatura: 0 = corte recto a 45°, 1 = curva suave completa).
const RUTA = {
  segmentosMin: 2,
  segmentosMax: 4,
  chaflan: 3.2,
  curvatura: 0.25,
  segmentosMinDeco: 1,
  segmentosMaxDeco: 3,
  chaflanDeco: 2.6,
  curvaturaDeco: 0.25,
}

// Más trazas = fondo más denso. En una placa 21:9 con viewBox 0-100,
// entre 60 y 90 se ve bien lleno sin volverse ilegible.
const CANTIDAD_TRAZAS_DECORATIVAS = 70

// Distribución de grosores: la mayoría de las pistas son finas, algunas
// llevan más "corriente" y se ensanchan (ver CSS: --grosor-fina/media/gruesa).
const PESOS_GROSOR = [
  ['fina', 0.55],
  ['media', 0.3],
  ['gruesa', 0.15],
]

// ---------------------------------------------------------------------------
// Utilidades deterministas (mismo seed -> mismo layout, sin cambiar en cada render)
// ---------------------------------------------------------------------------

function crearRandom(seed) {
  let s = seed >>> 0
  return function random() {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function elegirGrosor(random) {
  const r = random()
  let acumulado = 0
  for (const [nombre, peso] of PESOS_GROSOR) {
    acumulado += peso
    if (r <= acumulado) return nombre
  }
  return PESOS_GROSOR[0][0]
}

function colorDeNodo(i) {
  return COLORES_NODO[i % COLORES_NODO.length]
}

// ---------------------------------------------------------------------------
// Layout de nodos y lista de conexiones (grafo completo)
// ---------------------------------------------------------------------------

function generarPosiciones(cantidad) {
  const { origenX, origenY, anguloInicio, anguloRango, radioX, radioY } = LAYOUT
  return Array.from({ length: cantidad }, (_, i) => {
    const radioNorm = Math.sqrt((i + 1) / cantidad)
    const angulo = anguloInicio + ((i * ANGULO_DORADO) % anguloRango)
    return {
      x: origenX + radioNorm * radioX * Math.cos(angulo),
      y: origenY + radioNorm * radioY * Math.sin(angulo),
    }
  })
}

function generarConexiones(cantidad) {
  const conexiones = []
  for (let i = 0; i < cantidad; i++) {
    for (let j = i + 1; j < cantidad; j++) {
      conexiones.push({ key: `${i}-${j}`, from: i, to: j })
    }
  }
  return conexiones
}

// ---------------------------------------------------------------------------
// Ruteo estilo PCB
//
// En vez de ir directo, la pista se arma como una serie de tramos
// horizontales/verticales alternados (como calles de una ciudad vista desde
// arriba), y cada esquina recta se corta en 45° en vez de quedar en ángulo
// vivo. Esa misma función sirve tanto para las conexiones reales entre
// chips como para las trazas puramente decorativas.
// ---------------------------------------------------------------------------

function generarWaypoints(a, b, random, { segmentosMin, segmentosMax }) {
  const numSegmentos = segmentosMin + Math.floor(random() * (segmentosMax - segmentosMin + 1))

  // Secuencia de ejes alternados (x, y, x, y...), arrancando al azar.
  const ejes = []
  let eje = random() > 0.5 ? 'x' : 'y'
  for (let i = 0; i < numSegmentos; i++) {
    ejes.push(eje)
    eje = eje === 'x' ? 'y' : 'x'
  }

  // Reparte el desplazamiento total en cada eje entre sus tramos, con
  // variación aleatoria, para que ningún tramo se vea "calculado".
  const repartir = (total, cantidad) => {
    if (cantidad === 0) return []
    const pesos = Array.from({ length: cantidad }, () => 0.5 + random())
    const sumaPesos = pesos.reduce((s, p) => s + p, 0)
    return pesos.map((p) => (p / sumaPesos) * total)
  }

  const pasosX = repartir(b.x - a.x, ejes.filter((e) => e === 'x').length)
  const pasosY = repartir(b.y - a.y, ejes.filter((e) => e === 'y').length)

  const puntos = [a]
  let actual = a
  let cursorX = 0
  let cursorY = 0
  for (const e of ejes) {
    const paso = e === 'x' ? pasosX[cursorX++] : pasosY[cursorY++]
    actual = e === 'x' ? { x: actual.x + paso, y: actual.y } : { x: actual.x, y: actual.y + paso }
    puntos.push(actual)
  }

  return puntos
}

// Corta una esquina recta en 45°: retrocede `corte` unidades desde el
// vértice sobre cada uno de los dos tramos que se cruzan ahí, y esos dos
// puntos se unen con una línea recta. Como un tramo es horizontal puro y el
// otro vertical puro, esa línea de unión cae siempre en un ángulo de 45°.
function achaflanarEsquina(prev, esquina, next, tamano) {
  const largoEntrada = Math.hypot(esquina.x - prev.x, esquina.y - prev.y) || 1
  const largoSalida = Math.hypot(next.x - esquina.x, next.y - esquina.y) || 1
  const corte = Math.min(tamano, largoEntrada * 0.4, largoSalida * 0.4)

  const entrada = {
    x: esquina.x - ((esquina.x - prev.x) / largoEntrada) * corte,
    y: esquina.y - ((esquina.y - prev.y) / largoEntrada) * corte,
  }
  const salida = {
    x: esquina.x + ((next.x - esquina.x) / largoSalida) * corte,
    y: esquina.y + ((next.y - esquina.y) / largoSalida) * corte,
  }
  return { entrada, salida }
}

// Convierte una lista de waypoints en un path SVG con esquinas achaflanadas
// y devuelve además las esquinas (vías) para poder dibujar un pad ahí.
//
// `curvatura` controla cómo se une entrada->salida en cada esquina:
//   0    -> línea recta (corte limpio a 45°, estilo "chanfle" de PCB)
//   1    -> curva Bézier completa usando el vértice original como control
//           (esquina redondeada, sin ningún tramo recto en el giro)
// valores intermedios mezclan ambos.
function construirRutaPCB(puntos, chaflan, curvatura = 0) {
  if (puntos.length < 2) return { d: '', vias: [] }
  if (puntos.length === 2) {
    const [p0, p1] = puntos
    return { d: `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y}`, vias: [] }
  }

  const vias = puntos.slice(1, -1)
  let d = `M ${puntos[0].x} ${puntos[0].y}`
  for (let i = 1; i < puntos.length - 1; i++) {
    const esquina = puntos[i]
    const { entrada, salida } = achaflanarEsquina(puntos[i - 1], esquina, puntos[i + 1], chaflan)
    if (curvatura <= 0) {
      d += ` L ${entrada.x} ${entrada.y} L ${salida.x} ${salida.y}`
    } else {
      // el punto de control se acerca al vértice real a medida que sube la curvatura,
      // así con curvatura=1 la curva "abraza" la esquina y con valores bajos casi no se nota
      const ctrlX = entrada.x + (esquina.x - entrada.x) * curvatura
      const ctrlY = entrada.y + (esquina.y - entrada.y) * curvatura
      d += ` L ${entrada.x} ${entrada.y} Q ${ctrlX} ${ctrlY} ${salida.x} ${salida.y}`
    }
  }
  d += ` L ${puntos[puntos.length - 1].x} ${puntos[puntos.length - 1].y}`

  return { d, vias }
}

function generarRutaPCB(a, b, random, opciones) {
  const puntos = generarWaypoints(a, b, random, opciones)
  const { d, vias } = construirRutaPCB(puntos, opciones.chaflan, opciones.curvatura)
  return { d, vias, grosor: elegirGrosor(random) }
}

// Trazas que no conectan ningún nodo real: solo llenan la placa. Arrancan
// en un punto al azar y caminan un rumbo corto, igual que una pista real
// pero sin destino funcional.
function generarTrazasDecorativas(cantidad, random) {
  const trazas = []
  for (let i = 0; i < cantidad; i++) {
    const inicio = { x: random() * 100, y: random() * 100 }
    const largoTotal = 12 + random() * 30
    const finConVia = random() > 0.4

    // ángulo general del recorrido, con tramos en zigzag alrededor de esa dirección
    const rumboHorizontal = random() > 0.5
    const destino = rumboHorizontal
      ? { x: Math.min(100, Math.max(0, inicio.x + largoTotal * (random() > 0.5 ? 1 : -1))), y: inicio.y }
      : { x: inicio.x, y: Math.min(100, Math.max(0, inicio.y + largoTotal * (random() > 0.5 ? 1 : -1))) }

    const puntos = generarWaypoints(inicio, destino, random, {
      segmentosMin: RUTA.segmentosMinDeco,
      segmentosMax: RUTA.segmentosMaxDeco,
    })
    const { d, vias } = construirRutaPCB(puntos, RUTA.chaflanDeco, RUTA.curvaturaDeco)

    trazas.push({
      key: `deco-${i}`,
      d,
      vias,
      pad: finConVia ? puntos[puntos.length - 1] : null,
      grosor: elegirGrosor(random),
    })
  }
  return trazas
}

// ---------------------------------------------------------------------------
// Sub-componentes de dibujo
// ---------------------------------------------------------------------------

function ViaPCB({ x, y, activa, decorativa }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={decorativa ? 0.3 : 0.32}
      className={`pcb-via ${decorativa ? 'deco' : ''} ${activa ? 'activa' : ''}`}
    />
  )
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

function EquipoRed({ equipo }) {
  const [hoverIndex, setHoverIndex] = useState(null)

  const posiciones = useMemo(() => generarPosiciones(equipo.length), [equipo.length])
  const conexiones = useMemo(() => generarConexiones(equipo.length), [equipo.length])

  const rutas = useMemo(() => {
    const random = crearRandom(equipo.length * 1000 + 1)
    return conexiones.map((c) =>
      generarRutaPCB(posiciones[c.from], posiciones[c.to], random, {
        segmentosMin: RUTA.segmentosMin,
        segmentosMax: RUTA.segmentosMax,
        chaflan: RUTA.chaflan,
        curvatura: RUTA.curvatura,
      })
    )
  }, [conexiones, posiciones, equipo.length])

  const trazasDecorativas = useMemo(() => {
    const random = crearRandom(equipo.length + 7)
    return generarTrazasDecorativas(CANTIDAD_TRAZAS_DECORATIVAS, random)
  }, [equipo.length])

  return (
    <div className="neural-container">
      <svg className="neural-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* capa decorativa: pistas que no van a ningún lado, solo rellenan la placa */}
        <g className="pcb-decor">
          {trazasDecorativas.map((t) => (
            <g key={t.key}>
              <path d={t.d} className={`pcb-traza deco grosor-${t.grosor}`} />
              {t.vias.map((v, idx) => (
                <ViaPCB key={idx} x={v.x} y={v.y} decorativa />
              ))}
              {t.pad && <ViaPCB x={t.pad.x} y={t.pad.y} decorativa />}
            </g>
          ))}
        </g>

        {/* conexiones reales entre chips */}
        {conexiones.map((c, i) => {
          const ruta = rutas[i]
          const activa = hoverIndex === c.from || hoverIndex === c.to
          return (
            <g key={c.key}>
              <path d={ruta.d} className={`pcb-traza grosor-${ruta.grosor} ${activa ? 'activa' : ''}`} />
              {ruta.vias.map((v, idx) => (
                <ViaPCB key={idx} x={v.x} y={v.y} activa={activa} />
              ))}
            </g>
          )
        })}
      </svg>

      {equipo.map((persona, i) => {
        const pos = posiciones[i]
        const activo = hoverIndex === i
        return (
          <div
            key={i}
            className={`neural-node ${activo ? 'activo' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              '--color-nodo': colorDeNodo(i),
            }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="neural-node-nucleo">
              <div className="neural-node-anillo"></div>
            </div>

            {activo && (
              <div className={`neural-card ${pos.x > 55 ? 'izquierda' : 'derecha'}`}>
                {persona.foto && (
                  <div
                    className="neural-card-foto"
                    style={{ backgroundImage: `url(${persona.foto})` }}
                  ></div>
                )}
                <div className="neural-card-body">
                  <h3>{persona.nombre}</h3>
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
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EquipoRed