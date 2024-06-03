import { useState } from 'react'
import '../../../styles/AdminPage/Personal/AddNewStaffModal.css'
import ProfesorCard from '../../Nosotros/ProfesorCard.jsx'

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
      if (img == '') {
        setError('Suba la imagen')
        return;
      }
    }

    if (e.target.innerText == 'Si') {
      // POST A PERSONAL PENDIENTE ...
      const data = {
        name: nombre,
        cargo: cargo
      };

      try {
        console.log('enviando datos...')
        console.log(data)
        const response = await fetch('https://englishempire.onrender.com/staff', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Datos enviados exitosamente!");
        } else {
          console.log("Error al enviar los datos.");
          setError('Error al enviar los datos')
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Error al enviar los datos.");
      }

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