import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import '../../../styles/AdminPage/Configuracion/Configuracion.css'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function ChangePasswordModal({ salirModal }) {
  const [errors, setError] = useState('')
  const [passwords, setPasswords] = useState({
    oldPass: '',
    newPass: ''
  })

  const handleInputChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.id]: e.target.value
    })
  }

  const handleChangePassword = async () => {
    setError('')
    // Auntenticar usuario
    const auth = getAuth()
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, passwords.oldPass);
    try {
      Swal.fire({
        title: "Actualizando datos...",
        text: "Por favor espera.",
        icon: "info",
        showConfirmButton: false,  // No mostrar botón
        allowOutsideClick: false,  // Evitar que se cierre fuera del cuadro
        didOpen: () => {
          Swal.showLoading();  // Muestra el spinner
        }
      });
      await reauthenticateWithCredential(user, credential)
      // Usuario reautenticado, cambiar contraseña
      await updatePassword(user, passwords.newPass);
      Swal.close();
      Swal.fire({
        text: "Contraseña actualizada correctamente",
        icon: "success"
      }).then(() => {
        salirModal(false)
      })
    } catch (e) {
      setError(`Error en la reautenticación: ${e}`);
    }

  }

  return (
    <div className='change-pass-modal'>
      <div className='change-pass-box'>
        <div className='back-btn' onClick={() => { salirModal(false) }}>X</div>
        <label htmlFor="oldPass">Ingrese su contraseña actual:</label>
        <input type="password" id="oldPass" value={passwords.oldPass} onChange={handleInputChange} />
        <label htmlFor="newPass">Ingrese su nueva contraseña:</label>
        <input type="password" id="newPass" value={passwords.newPass} onChange={handleInputChange} />
        <button onClick={handleChangePassword}>Cambiar contraseña</button>
        {
          errors &&
          <p>{errors}</p>
        }
      </div>
    </div>
  )
}