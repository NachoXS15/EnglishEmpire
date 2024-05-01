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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />
  },
  {
    path: '/cursos',
    element: <Cursos></Cursos>
  },
  {
    path: '/nosotros',
    element: <Nosotros></Nosotros>
  },
  {
    path: '/postulate',
    element: <Postulate></Postulate>
  },
  {
    path: '/contacto',
    element: <Contacto></Contacto>
  },
  {
    path: '/cursos/:nivel/:id',
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
    path: '/administracion',
    element: <Login />
  },
  {
    path: '/menu',
    element: <Menu />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
