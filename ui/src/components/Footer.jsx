import '../styles/Footer.css'
import logoFooter from '../assets/logo_footer.png'
import fbIcon from '../assets/icons/icon-fb.png'
import igIcon from '../assets/icons/icon-ig.png'
import tiktokIcon from '../assets/icons/icon-tiktok.png'


export default function Footer() {
  return (
    <div className='footer-container'>
      <footer>
        <div className='logo-container'>
          <img src={logoFooter} alt="Logo" className='logo-footer' />
        </div>
        <nav>
          <h3>Cursos</h3>
          <li><a href="">Kinder</a></li>
          <li><a href="">Juniors</a></li>
          <li><a href="">Teens</a></li>
          <li><a href="">Adults</a></li>
          <li><a href="">Individuales</a></li>
          <li><a href="">Empresariales</a></li>
        </nav>
        <nav className='nosotros-nav'>
          <h3>Nosotros</h3>
          <li><a href="">Quiénes somos</a></li>
          <li><a href="">Contacto</a></li>
          <li><a href="">Trabajá con nosotros</a></li>
          <li><a href="">Preguntas Frecuentes</a></li>
        </nav>
        <div className='redes-footer'>
          <p>Seguinos</p>
          <div>
            <a target='_blank' rel='noreferrer' href="https://www.facebook.com/englishempirelr"><img src={fbIcon} alt="" /></a>
            <a target='_blank' rel='noreferrer' href="https://www.instagram.com/englishempirelr/"><img src={igIcon} alt="" /></a>
            <a target='_blank' rel='noreferrer' href="https://www.tiktok.com/@englishempirelr"><img src={tiktokIcon} alt="" /></a>
          </div>
        </div>
      </footer>
      <div className='copyrigth'>
        Copyright @ 2024 English Empire Institute
      </div>
    </div>
  )
}