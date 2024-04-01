import '../../styles/Contacto.css'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import fbIcon from '../../assets/icons/icon-fb.png'
import igIcon from '../../assets/icons/icon-ig.png'
import tikTokIcon from '../../assets/icons/icon-tiktok.png'

export default function Contacto() {
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
              <a href="">
                <img src={fbIcon} alt="Facebook" />
              </a>
              <a href="">
                <img src={igIcon} alt="" />
              </a>
              <a href="">
                <img src={tikTokIcon} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className='form-container'>
          <form action='#'>
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
              <label htmlFor="mail">
                Email
                <span>*</span>
              </label>

              <input type="email" id='mail' />
            </div>
            <div className='form-element'>
              <label htmlFor="telefono">
                Telefono
                <span>*</span>
              </label>

              <input type="number" id='telefono' inputMode='numeric' />
            </div>
            <div className='form-element text-area'>
              <label htmlFor="consulta">
                Consulta
                <span>*</span>
              </label>
              <textarea name="consulta" id="consulta" cls="30" rows="10"></textarea>
            </div>
            <div className='form-element button'>
              <button>Enviar</button>
            </div>
          </form>
        </div>

      </section>
      <Footer></Footer>
    </>
  )
}