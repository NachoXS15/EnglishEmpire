import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Logo from '../../assets/logo.png'
import '../../styles/AdminPage/Menu.css'

export default function Menu() {
  const navigate = useNavigate()

  const isLogged = true

  useEffect(() => {
    if (!isLogged) {
      navigate('/administracion')
    }
  }, [history])

  return (
    <div className="menu-container">
      <div className="menu-box">
        <img src={Logo} alt="English Empire" />
        <button>Cursos</button>
        <button>Personal</button>
        <button>Inscripciones</button>
        <button>Configuración</button>
        <button>Cerrar Sesión</button>
      </div>
    </div>
  )
}