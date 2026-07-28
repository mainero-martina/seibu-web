import { useState } from 'react'
import './App.css'
import Nav from './components/nav'
import Equipo from './components/equipo'
import Hero from './components/hero'
import Proyectos from './components/proyectos'
import Revista from './components/revista'
import Contacto from './components/contacto'


function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Equipo />
      <Proyectos />
      <Revista />
      <Contacto />
    </>
  )
}

export default App