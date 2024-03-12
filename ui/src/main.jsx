import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inicio from './components/Inicio/Inicio.jsx'
import Cursos from './components/Cursos/Cursos.jsx'
import Nosotros from './components/Nosotros/Nosotros.jsx'

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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
