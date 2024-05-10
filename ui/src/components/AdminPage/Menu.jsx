import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from '../../assets/logo.png'
import '../../styles/AdminPage/Menu.css'

export default function Menu() {
  const navigate = useNavigate()

  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    if (!isLogged) {
      navigate('/administracion')
    }
  }, [isLogged])

  const logOut = () => {
    setIsLogged(false)
  }

  const goTo = (url) => {
    navigate(url)
  }

  return (
    <div className="menu-container">
      <div className="menu-box">
        <img src={Logo} alt="English Empire" />
        <button onClick={() => goTo('./cursos')}>Cursos</button>
        <button onClick={() => goTo('./personal')}>Personal</button>
        <button onClick={() => goTo('./configuracion')}>Configuración</button>
        <button onClick={() => logOut()}>Cerrar Sesión</button>
      </div>
    </div>
  )
}