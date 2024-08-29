import { useNavigate } from 'react-router-dom'
import '../../../styles/AdminPage/Configuracion/Configuracion.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { signOut } from '../../../config/auth'
import ChangePasswordModal from './ChangePasswordModal'

export default function Configuracion() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [user, setUser] = useState({})
  const [changePassModal, setChangePassModal] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        navigate('../administracion')
      }
    });

    return () => unsubscribe();
  }, [auth, navigate])

  const goBackToMenu = () => {
    navigate('../menu')
  }

  const handleClick = (e) => {
    if (e.target.id == 'password-btn') {
      setChangePassModal(true)
    }

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
        <button onClick={handleClick} id='password-btn'>Cambiar Contraseña</button>
        <button onClick={() => { signOut() }}>Cerrar Sesión</button>
      </div>
      {
        changePassModal &&
        <ChangePasswordModal salirModal={setChangePassModal} />
      }
    </div>
  )
}