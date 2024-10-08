import '../../styles/Contacto.css'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import { useState } from 'react'
import { addDoc, collection, getFirestore } from 'firebase/firestore'


export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    consulta: ''
  })

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const db = getFirestore()
  const submitConsulta = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Consultas'), form)
      alert('Consulta cargada existosamente')
      window.location.reload()
    } catch (err) {
      alert('Ha ocurrido un error, intente nuevamente!')
    }
  }


  return (
    <>
      <Header></Header>
      <section className='contacto-container'>
        <MainBanner>Contacto</MainBanner>
        <div className='contacto-info'>
          <div>
            <p>¿Tenés alguna duda?</p>
            <p>¡Nosotros te podemos ayudar!</p>
          </div>
          <div>
            <p>¡Usa nuestras redes para comunicarte!</p>
            <div className='contacto-icons'>
              <a target='_blank' href="https://www.facebook.com/englishempirelr">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a target='_blank' href="https://www.instagram.com/englishempirelr/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a target='_blank' href="https://wa.me/3804259004">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className='form-container'>
          <form onSubmit={submitConsulta}>
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
              <label htmlFor="email">
                Email
                <span>*</span>
              </label>

              <input required onChange={handleInputChange} value={form.email} type="email" id='email' />
            </div>
            <div className='form-element'>
              <label htmlFor="telefono">
                Telefono
                <span>*</span>
              </label>

              <input required onChange={handleInputChange} value={form.telefono} type="number" id='telefono' inputMode='numeric' />
            </div>
            <div className='form-element text-area'>
              <label htmlFor="consulta">
                Consulta
                <span>*</span>
              </label>
              <textarea minLength={10} maxLength={240} required onChange={handleInputChange} value={form.consulta} name="consulta" id="consulta" cls="30" rows="10"></textarea>
            </div>
            <div className='form-element button'>
              <button>Enviar</button>
            </div>
          </form>
        </div >

      </section >
      <Footer></Footer>
    </>
  )
}