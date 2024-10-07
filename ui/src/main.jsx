import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Inicio from './components/Inicio/Inicio.jsx'
import Cursos from './components/Cursos/Cursos.jsx'
import Nosotros from './components/Nosotros/Nosotros.jsx'
import Postulate from './components/Postulate/Postulate.jsx'
import Contacto from './components/Contacto/Contacto.jsx'
import CursoDetails from './components/CursoDetails/CursoDetails.jsx'
import Inscription from './components/Inscription/Inscription.jsx'
import Login from './components/AdminPage/Login.jsx'
import Menu from './components/AdminPage/Menu.jsx'
import CursosAdm from './components/AdminPage/CursosAdm/CursosAdm.jsx'
import Personal from './components/AdminPage/Personal/Personal.jsx'
import Inscripciones from './components/AdminPage/Inscripciones/Inscripciones.jsx'
import Consultas from './components/AdminPage/Consultas/Consultas.jsx'
import Personalizados from './components/CursoDetails/Personalizados.jsx'

import './config/firebase-config.js'
import Configuracion from './components/AdminPage/Configuracion/Configuracion.jsx'
import Faq from './components/faq/Faq.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />
  },
  {
    path: '/nosotros',
    element: <Nosotros />
  },
  {
    path: '/postulate',
    element: <Postulate />
  },
  {
    path: '/contacto',
    element: <Contacto />
  },
  {
    path: '/cursos',
    element: <Cursos />
  },
  {
    path: '/individuales',
    element: <Personalizados tipo='Individuales' />,
  },
  {
    path: '/empresariales',
    element: <Personalizados tipo='Empresariales' />
  },
  {
    path: '/cursos/:nivel',
    element: <Cursos />
  },
  {
    path: '/cursos/:nivel/:nombre',
    element: <CursoDetails />
  },
  {
    path: '/inscripcion',
    element: <Inscription />
  },
  {
    path: '/inscripcion/:id',
    element: <Inscription />
  },
  {
    path: '/faq',
    element: <Faq />
  },
  {
    // --------Admin page--------
    path: '/administracion',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Login />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/menu/cursos',
    element: <CursosAdm />
  },
  {
    path: '/menu/personal',
    element: <Personal />
  },
  {
    path: '/menu/inscripciones',
    element: <Inscripciones />
  },
  {
    path: '/menu/configuracion',
    element: <Configuracion />
  },
  {
    path: '/menu/consultas',
    element: <Consultas />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
