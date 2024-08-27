import { useNavigate } from "react-router-dom"
import Logo from '../../assets/logo.png'
import '../../styles/AdminPage/Menu.css'
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default function Menu() {
  const navigate = useNavigate()

  const auth = getAuth();
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('existe usuario', currentUser)
      } else {
        navigate('../administracion')
      }
    });

    return () => unsubscribe();
  }, [auth, navigate])

  const goTo = (dir) => {
    navigate(dir)
  }

  return (
    <div className="menu-container">
      <div className="menu-box">
        <img src={Logo} alt="English Empire" />
        <button onClick={() => goTo('./cursos')}>Cursos</button>
        <button onClick={() => goTo('./personal')}>Personal</button>
        <button onClick={() => goTo('./inscripciones')}>Inscripciones</button>
        <button onClick={() => goTo('./configuracion')}>Configuración</button>
      </div>
    </div>
  )
}