import { useState } from 'react'
import '../../../styles/AdminPage/Personal/ModificarStaffModal.css'
import ProfesorCard from '../../Nosotros/ProfesorCard'
import { doc, getFirestore, updateDoc, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'

export default function ModificarStaffModal({ empleado, setId }) {
  const [actualizarStaffModal, setActualizarStaffModal] = useState(false)
  const [deleteStaffModal, setDeleteStaffModal] = useState(false)
  const [nombre, setNombre] = useState(empleado.nombre)
  const [cargo, setCargo] = useState(empleado.cargo)
  const [imagen, setImagen] = useState(null)
  const [imageBase64, setImageBase64] = useState('')
  const [error, setError] = useState('')

  const db = getFirestore();
  const storage = getStorage();


  const handleExitModal = () => {
    setId(0)
  }

  const uploadImage = async (base64Image) => {
    const storageRef = ref(storage, `images/${new Date().getTime()}`);
    await uploadString(storageRef, base64Image, 'data_url');
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };


  const handleInputChange = async (e) => {
    if (e.target.id == 'nombre') {
      setNombre(e.target.value)
    } else if (e.target.id == 'cargo') {
      setCargo(e.target.value)
    } else if (e.target.id == 'img') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImagen(reader.result)
          setImageBase64(reader.result);
        };
      }
    }
  }

  const updateData = async (id, updatedData) => {
    try {
      const docRef = doc(db, "Staff", id);
      await updateDoc(docRef, updatedData);
      alert('Datos actualizados!')
      window.location.reload()
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault()
    if (e.target.innerText == 'Guardar Cambios') {
      if (nombre == '') {
        setError('Ingrese nombre')
        return;
      }
      if (cargo == '') {
        setError('Ingrese cargo')
        return;
      }
      if (imageBase64 == '') {
        setError('Suba la imagen')
        return;
      }
    }
    if (e.target.innerText == 'Si') {
      const imgURL = await uploadImage(imageBase64)
      let nuevaData = {
        nombre: nombre,
        cargo: cargo,
        imagen: imgURL
      }
      updateData(empleado.id, nuevaData)
      // post a staff
      console.log(empleado)

    }
    setError('')
    setActualizarStaffModal(prevState => !prevState)
  }

  const handleDeleteStaff = async (e) => {
    e.preventDefault()
    setDeleteStaffModal(true)
    if (e.target.innerText == 'Si') {
      try {
        const docRef = doc(db, "Staff", empleado.id);
        await deleteDoc(docRef);
        alert("Documento eliminado correctamente");
        window.location.reload(); // Recargar la página después de eliminar el documento
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Ocurrió un error al eliminar el documento. Por favor, inténtalo de nuevo.");
      }
    }
    if (e.target.innerText == 'No') {
      setDeleteStaffModal(false)
    }
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
            <input type="file" id='img' onChange={handleInputChange} accept=".jpg, .jpeg, .png" />
          </div>
          <div className='btns-div'>
            <button onClick={handleGuardarCambios}>Guardar Cambios</button>
            <button onClick={handleDeleteStaff}>Eliminar Empleado</button>
          </div>
          {error && <p>{error}</p>}
        </form>

        {
          actualizarStaffModal &&
          <div className='guardar-cambios-modal'>
            <div>
              <p>¿Desea modificar personal?</p>
              <div className='img-preview'>
                <ProfesorCard
                  name={nombre}
                  role={cargo}
                  imgUrl={imagen}
                />
              </div>
              <div>
                <button onClick={handleGuardarCambios}>Si</button>
                <button onClick={handleGuardarCambios}>No</button>
              </div>
            </div>
          </div>
        }
        {
          deleteStaffModal &&
          <div className='delete-staff-modal'>
            <div>
              <p>¿Eliminar a {empleado.nombre}?</p>
              <div>
                <button onClick={handleDeleteStaff}>Si</button>
                <button onClick={handleDeleteStaff}>No</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}