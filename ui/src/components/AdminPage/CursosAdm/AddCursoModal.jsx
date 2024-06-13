import { useState } from 'react'
import '../../../styles/AdminPage/Cursos/AddCursoModal.css'
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

export default function AddCursoModal({ navigateTo, categories, categorySelectedName }) {
  const [descartarCambiosModal, setDescartarCambiosModal] = useState(false)
  const [agregarCursoModal, setAgregarCursoModal] = useState(false)

  const storage = getStorage();
  const db = getFirestore();

  // Datos del curso
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Kinders',
    inicio: '',
    fin: '',
    edades: '',
    duracion: '',
    clasesSemanales: '',
    imagen: '',
    descripcion: '',
  })
  const [errors, setErrors] = useState([])

  const validate = () => {
    const newErrors = [];
    if (!form.nombre) newErrors.push('Ingrese Nombre');
    if (!form.inicio) newErrors.push('Ingrese Inicio del Curso');
    if (!form.fin) newErrors.push('Ingrese Fin del Curso');
    if (!form.edades) newErrors.push('Ingrese Edades');
    if (!form.duracion) newErrors.push('Ingrese Duración');
    if (!form.clasesSemanales) newErrors.push('Ingrese Clases Semanales');
    if (!form.descripcion) newErrors.push('Ingrese Descripción');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      if (e.target.innerText == 'Agregar curso') {
        setAgregarCursoModal(true)
      } else if (e.target.innerText == 'Confirmar') {
        const urlImg = await uploadImage(form.imagen)
        console.log(urlImg)
        saveDataToDB({
          ...form,
          imagen: urlImg
        })
      }
    }
  }

  const descartarCambios = (e) => {
    setDescartarCambiosModal(false)
    if (e.target.innerText == 'Si') {
      navigateTo(0)
    }

  }

  const handleInputChange = async (e) => {
    const { id, value } = e.target
    if (e.target.id == 'imagen') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setForm({
            ...form,
            [id]: reader.result
          })
        };
      }
    }
    setForm({
      ...form,
      [id]: value
    });

  }

  const uploadImage = async (base64Image) => {
    const storageRef = ref(storage, `images/${new Date().getTime()}`);
    await uploadString(storageRef, base64Image, 'data_url');
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const saveDataToDB = async (data) => {
    try {
      await addDoc(collection(db, "Cursos"), data);
      alert("Curso agregado correctamente!");
      navigateTo(0)
      window.location.reload()
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Ocurrió un error al guardar la información. Por favor, inténtalo de nuevo.");
    }

  }

  return (
    <div className="modificar-curso-container">
      <div className='modificar-curso-box'>
        <h2>Agregar Curso</h2>
        <form className='modificar-form-cursos'>
          <div>
            <label htmlFor="nombre">Nombre del curso</label>
            <input type="text" id='nombre' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="categorie">Categoria del curso</label>
            <select name="categorie" id="categorie" onChange={handleInputChange} defaultValue={categorySelectedName}>
              {
                categories.map(category => (
                  <option name={category} key={category} value={category}>{category}</option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="inicio">Inicio del curso</label>
            <input type="text" id='inicio' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="fin">Fin del curso</label>
            <input type="text" id='fin' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="edades">Edades</label>
            <input type="text" id='edades' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="duracion">Duración</label>
            <input type="text" name="duracion" id="duracion" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="clasesSemanalas">Clases semanales</label>
            <input type="number" name="clasesSemanales" id="clasesSemanales" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="imagen">Imagen del curso</label>
            <label htmlFor="imagen" className='programa-label'>
              Seleccionar Archivo
            </label>
            <input type="file" accept='.jpeg, .jpg, .png' id='imagen' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="descripcion">Descripcion del curso</label>
            <textarea name="descripcion" id="descripcion" onChange={handleInputChange}></textarea>
          </div>
          <div className='modificar-curso-btns'>
            <button onClick={handleSubmit}>Agregar curso</button>
          </div>
          {
            errors &&
            <div>
              <p>{errors[0]}</p>
            </div>
          }
        </form>
        <div className='salir-modificar' onClick={() => {
          setDescartarCambiosModal(true)
        }}>X</div>

      </div>
      {
        descartarCambiosModal &&
        <div className='descartar-cambios-modal'>
          <div className='descartar-cambios-box'>
            <p>¿Deseas descartar los cambios realizados?</p>
            <div>
              <button onClick={descartarCambios}>Si</button>
              <button onClick={descartarCambios}>No</button>
            </div>
          </div>
        </div>
      }
      {
        agregarCursoModal &&
        <div className="actualizar-curso-modal">
          <div className='actualizar-curso-box'>
            <p>¿Agregar curso?</p>
            <button onClick={handleSubmit}>Confirmar</button>
            <div className='no-actualizar-curso' onClick={() => { setAgregarCursoModal(false) }}>
              <i className="fa-solid fa-x"></i>
            </div>
          </div>
        </div>
      }
    </div>
  )
}