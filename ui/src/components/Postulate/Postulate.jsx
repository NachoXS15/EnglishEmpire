import '../../styles/Postulate.css'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import { useState } from 'react'
import { getStorage, uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { collection, getFirestore, addDoc, sum } from 'firebase/firestore'

export default function Postulate() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: '',
    email: '',
    telefono: '',
    descripcion: '',
    cv: ''
  })
  const [file, setFile] = useState(null)
  const storage = getStorage()
  const db = getFirestore()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Solo se permiten archivos PDF');
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const submitFile = async () => {
    try {
      // Subir el archivo a Firebase Storage
      const storageRef = ref(storage, `comprobantes/${file.name}`);
      await uploadBytes(storageRef, file);

      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(storageRef);

      console.log('Archivo subido y guardado exitosamente en Firestore');
      return downloadURL
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un error al subir el archivo');
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let subirArchivo = await submitFile()
    if (subirArchivo) {
      try {
        const postulantesRef = collection(db, 'Postulantes');
        await addDoc(postulantesRef, {
          ...form,
          cv: subirArchivo,
          fecha: new Date()
        });
        alert('Postulado exitosamente! Nos estaremos comunicando a la brevedad')
        window.location.reload()
      } catch {
        alert('Error al postular, intente nuevamente')
      }
    }
  };

  return (
    <>
      <Header></Header>
      <section className='postulate--main-container'>
        <MainBanner>Trabaja con nosotros</MainBanner>
        <div className='form-container'>
          <form action="#" onSubmit={handleSubmit}>
            <div className='form-element'>
              <label htmlFor="nombre">
                Nombre
                <span>*</span>
              </label>

              <input required onChange={handleInputChange} value={form.nombre} type="text" id='nombre' />
            </div>
            <div className='form-element'>
              <label htmlFor="apellido">
                Apellido
                <span>*</span>
              </label>
              <input required onChange={handleInputChange} value={form.apellido} type="text" id='apellido' />
            </div>
            <div className='form-element'>
              <label htmlFor="dni">
                DNI
                <span>*</span>
              </label>
              <input required onChange={handleInputChange} value={form.dni} type="number" id='dni' />
            </div>
            <div className='form-element'>
              <label htmlFor="nacimiento">
                Fecha de nacimiento
                <span>*</span>
              </label>
              <input required onChange={handleInputChange} value={form.nacimiento} type="date" id='nacimiento' />
            </div>
            <div className='form-element'>
              <label htmlFor="email">
                Email
                <span>*</span>
              </label>
              <input required onChange={handleInputChange} value={form.email} type="email" id='email' />
            </div>
            <div className='form-element'>
              <label htmlFor="telefono">
                Teléfono
                <span>*</span>
              </label>
              <input required onChange={handleInputChange} value={form.telefono} type="number" id='telefono' />
            </div>
            <div className='form-element text-area'>
              <label htmlFor="descripcion">
                Cuéntanos algo sobre ti
                <span>*</span>
              </label>
              <textarea required onChange={handleInputChange} value={form.descripcion} name="descripcion" id="descripcion" cls="30" rows="10"></textarea>
            </div>
            <div className='form-element file-element'>
              <label htmlFor="cv">Adjuntar CV (Formato PDF)</label>
              <input type='file' accept='.pdf' required onChange={handleFileChange} id='cv' />
            </div>
            <div className='form-element button'>
              <button>Enviar</button>
            </div>
          </form>


        </div>
      </section >
      <Footer></Footer>
    </>
  )
}
