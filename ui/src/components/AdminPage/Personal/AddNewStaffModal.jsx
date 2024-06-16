import { useState } from 'react'
import ProfesorCard from '../../Nosotros/ProfesorCard.jsx'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

export default function AddNewStaffModal({ setId }) {

  const [actualizarStaffModal, setActualizarStaffModal] = useState(false)
  const [error, setError] = useState('')
  const [nombre, setNombre] = useState('')
  const [cargo, setCargo] = useState('')
  const [img, setImg] = useState('')
  const [imageBase64, setImageBase64] = useState("");
  // Initialize Firebase
  const db = getFirestore();
  const storage = getStorage();

  const uploadImage = async (base64Image) => {
    const storageRef = ref(storage, `images/${new Date().getTime()}`);
    await uploadString(storageRef, base64Image, 'data_url');
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const handleExitModal = () => {
    setId(0)
  }

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
          setImg(reader.result)
          setImageBase64(reader.result);
        };
      }
    }
  }

  const saveData = async () => {
    try {
      const imgURL = await uploadImage(imageBase64);
      await addDoc(collection(db, "Staff"), {
        nombre: nombre,
        cargo: cargo,
        imagen: imgURL
      });
      alert("Personal agregado correctamente!");
      setId(0)
      window.location.reload()
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Ocurrió un error al guardar la información. Por favor, inténtalo de nuevo.");
    }
  }

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
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
            <input type="file" id='img' accept=".jpg, .jpeg, .png" onChange={handleInputChange} />
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