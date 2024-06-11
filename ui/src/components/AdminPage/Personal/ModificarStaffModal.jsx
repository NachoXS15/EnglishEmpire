import { useState } from 'react'
import '../../../styles/AdminPage/Personal/ModificarStaffModal.css'
import { doc, updateDoc } from 'firebase/firestore'

export default function ModificarStaffModal({ empleado, setId }) {
  const [actualizarStaffModal, setActualizarStaffModal] = useState(false)
  const [nombre, setNombre] = useState(empleado.nombre)
  const [cargo, setCargo] = useState(empleado.cargo)
  const [imagen, setImagen] = useState(null)

  const handleExitModal = () => {
    setId(0)
  }

  const handleInputChange = (e) => {
    console.log(e.target.id)
    if (e.target.id == 'nombre') {
      setNombre(e.target.value)
    }
    if (e.target.id == 'cargo') {
      setCargo(e.target.value)
    }
  }

  const updateData = async (id, updatedData) => {
    try {
      const docRef = doc(db, "Staff", id);
      await updateDoc(docRef, updatedData);
      alert("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo.");
    }
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault()
    console.log(e.target.innerText)
    if (e.target.innerText == 'Si') {
      let nuevaData = {
        nombre: nombre,
        cargo: cargo,
        img: imagen
      }
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
            <input type="text" id='nombre' defaultValue={empleado.nombre} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="cargo">Cargo</label>
            <input type="text" id='cargo' defaultValue={empleado.cargo} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="img">Imagen</label>
            <input type="file" id='img' onChange={handleInputChange} />
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