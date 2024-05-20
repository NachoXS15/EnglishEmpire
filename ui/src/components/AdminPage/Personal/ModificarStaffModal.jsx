import { useState } from 'react'
import '../../../styles/AdminPage/Personal/ModificarStaffModal.css'

const staff = [
  {
    name: 'Juan Davila',
    role: 'President',
    imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
  },
  {
    name: 'Davila Juan',
    role: 'President',
    imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
  },
  {
    name: 'Nicolás Lujan',
    role: 'Desarrollo y Tech',
    imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
  },
  {
    name: 'Marco Gavio',
    role: 'Ex-Profesor',
    imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
  }
]

export default function ModificarStaffModal() {

  const [staffAModificar, setStaffAModificar] = useState()
  const [descartarCambiosModal, setDescartarCambiosModal] = useState(false)
  const [actualizarStaffModal, setActualizarStaffModal] = useState(false)


  return (
    <div className='modificar-staff-container'>
      <div className='modificar-staff--box'>
        <div className='modificar-staff--title'>
          <h2>Modificar Personal</h2>
        </div>
        <form className='modificar-staff-form'>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="nombre">Cargo</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="nombre">Imagen</label>
            <input type="file" />
          </div>
        </form>
        <div className='salir-modificar-staff'>X</div>
      </div>
    </div>
  )
}