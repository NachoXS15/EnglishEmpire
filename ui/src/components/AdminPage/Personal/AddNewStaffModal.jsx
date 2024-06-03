import { useState } from 'react'
import '../../../styles/AdminPage/Personal/AddNewStaffModal.css'
import ProfesorCard from '../../Nosotros/ProfesorCard.jsx'
import { addDoc,collection, getFirestore } from 'firebase/firestore'

export default function AddNewStaffModal({ setId }) {

  const [actualizarStaffModal, setActualizarStaffModal] = useState(false)
  const [error, setError] = useState('')
  const [nombre, setNombre] = useState('')
  const [cargo, setCargo] = useState('')
  const [img, setImg] = useState('')
  const [imageBase64, setImageBase64] = useState("");

  const handleExitModal = () => {
    setId(0)
  }

  const db = getFirestore();

  const handleInputChange = async (e) => {
    if (e.target.id == 'nombre') {
      setNombre(e.target.value)
    } else if (e.target.id == 'cargo') {
      setCargo(e.target.value)
    } else if (e.target.id == 'img') {
      const file = e.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImg(e.target.result);
          setImageBase64(e.target.result.split(",")[1]);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    const saveData = async() => {
      const docRef = await addDoc(collection(db, "Staff"), {
        nombre: nombre,
        cargo: cargo,
        imagen: img
      });
      alert("Persona agregada a DB")

    }

    if (e.target.innerText == 'Guardar Cambios') {
      if (nombre == '') {
        setError('Ingrese nombre')
        return;
      }
      if (cargo == '') {
        setError('Ingrese cargo')
        return;
      }
      if (img == '') {
        setError('Suba la imagen')
        return;
      }
    }

    if (e.target.innerText == 'Si') {
      saveData();
      console.log(imageBase64)
    }
    setError('')
    setActualizarStaffModal(prevState => !prevState)
  }
  return (
    <div className='modificar-staff-container'>
      <div className='modificar-staff--box'>
        <div className='salir-modificar-staff' onClick={handleExitModal}>X</div>

        <div className='modificar-staff--title'>
          <h2>Añadir Personal</h2>
        </div>

        <form className='modificar-staff-form'>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id='nombre' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="cargo">Cargo</label>
            <input type="text" id='cargo' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="img">Imagen</label>
            <input type="file" id='img' accept=".jpg, .jpeg" onChange={handleInputChange} />
          </div>
          <div>
            <button onClick={handleGuardarCambios}>Guardar Cambios</button>
            {error && <p>{error}</p>}
          </div>
        </form>

        {
          actualizarStaffModal &&
          <div className='guardar-cambios-modal'>
            <div>
              <p>¿Desea añadir personal?</p>
              <div className='img-preview'>
                <ProfesorCard
                  name={nombre}
                  role={cargo}
                  imgUrl={img}
                />
              </div>
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