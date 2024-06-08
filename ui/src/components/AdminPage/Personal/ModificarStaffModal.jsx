import { useState } from 'react'
import '../../../styles/AdminPage/Personal/ModificarStaffModal.css'

export default function ModificarStaffModal({ empleado, setId }) {
  const [actualizarStaffModal, setActualizarStaffModal] = useState(false)
  const [nombre, setNombre] = useState(empleado.nombre)
  const [cargo, setCargo] = useState(empleado.cargo)
  const [imagen, setImagen] = useState(null)

  const handleExitModal = () => {
    setId(0)
  }

  const handleGuardarCambios = async (e) => {
    e.preventDefault()
    console.log(e.target.innerText)
    if (e.target.innerText == 'Si') {
      // guardar cambios
      // post a staff
      console.log(empleado)

    }
    setActualizarStaffModal(prevState => !prevState)

  }

  return (
    <div className='modificar-staff-container'>
      <div className='modificar-staff--box'>
        <div className='salir-modificar-staff' onClick={handleExitModal}>X</div>

        <div className='modificar-staff--title'>
          <h2>Modificar Personal</h2>
        </div>

        <form className='modificar-staff-form'>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id='nombre' defaultValue={empleado.nombre} />
          </div>
          <div>
            <label htmlFor="cargo">Cargo</label>
            <input type="text" id='cargo' defaultValue={empleado.cargo} />
          </div>
          <div>
            <label htmlFor="img">Imagen</label>
            <input type="file" id='img' />
          </div>
          <div>
            <button onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        </form>

        {
          actualizarStaffModal &&
          <div className='guardar-cambios-modal'>
            <div>
              <p>¿Desea guardar cambios?</p>
              <div>
                <button onClick={handleGuardarCambios}>Si</button>
                <button onClick={handleGuardarCambios}>No</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}