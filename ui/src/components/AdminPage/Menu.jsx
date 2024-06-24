import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from '../../assets/logo.png'
import '../../styles/AdminPage/Menu.css'
import { signOut } from "../../config/auth"

export default function Menu() {
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('item');
    if (!token) {
      setIsLogged(false)
      navigate('/administracion')
    }
  })
  
  useEffect(() => {
    if (!isLogged) {
      navigate('/administracion')
    }
  }, [isLogged, navigate])

  const logOut = () => {
    signOut();
    localStorage.removeItem('token');
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