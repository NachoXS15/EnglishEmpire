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

import './config/firebase-config.js'


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
    // --------Admin page--------
    path: '/administracion',
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
