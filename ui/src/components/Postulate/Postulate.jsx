import '../../styles/Postulate.css'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'

export default function Postulate() {
  return (
    <>
      <Header></Header>
      <section className='postulate--main-container'>
        <MainBanner>Trabaja con nosotros</MainBanner>
        <div className='form-container'>
          <form action="#">
            <div className='form-element'>
              <label htmlFor="nombre">
                Nombre
                <span>*</span>
              </label>

              <input type="text" id='nombre' />
            </div>
            <div className='form-element'>
              <label htmlFor="apellido">
                Apellido
                <span>*</span>
              </label>
              <input type="text" id='apellido' />
            </div>
            <div className='form-element'>
              <label htmlFor="dni">
                DNI
                <span>*</span>
              </label>
              <input type="number" id='dni' />
            </div>
            <div className='form-element'>
              <label htmlFor="date">
                Fecha de nacimiento
                <span>*</span>
              </label>
              <input type="date" id='date' />
            </div>
            <div className='form-element'>
              <label htmlFor="correo">
                Email
                <span>*</span>
              </label>
              <input type="email" id='correo' />
            </div>
            <div className='form-element'>
              <label htmlFor="telefono">
                Teléfono
                <span>*</span>
              </label>
              <input type="number" id='telefono' />
            </div>
            <div className='form-element text-area'>
              <label htmlFor="sobreTi">
                Cuéntanos algo sobre ti
                <span>*</span>
              </label>
              <textarea name="sobreTi" id="sobreTi" cls="30" rows="10"></textarea>
            </div>
            <div className='form-element file-element'>
              <label htmlFor="file">Adjuntar CV (formatos PDF o Word)</label>
              <input type="file" />
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