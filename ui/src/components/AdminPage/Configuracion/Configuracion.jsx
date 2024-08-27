import { useNavigate } from 'react-router-dom'
import '../../../styles/AdminPage/Configuracion/Configuracion.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { signOut } from '../../../config/auth'

export default function Configuracion() {
  const navigate = useNavigate()
  const auth = getAuth()

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

  const goBackToMenu = () => {
    navigate('../menu')
  }
  return (
    <div className='config--main-container'>
      <div className='config--header'>
        <div className='back-to-menu-btn' onClick={goBackToMenu}>
          <i className="fa-solid fa-circle-left"></i>
        </div>
        <h2>Configuración</h2>
      </div>
      <div className='config--buttons'>
        <button>Cambiar Contraseña</button>
        <button>Invitar usuario</button>
        <button onClick={() => { signOut() }}>Cerrar Sesión</button>
      </div>
    </div>
  )
}