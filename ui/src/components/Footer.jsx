import '../styles/Footer.css'
import logoFooter from '../assets/logo_footer.png'
import fbIcon from '../assets/icons/icon-fb.png'
import igIcon from '../assets/icons/icon-ig.png'
import tiktokIcon from '../assets/icons/icon-tiktok.png'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <div className='footer-container'>
      <footer>
        <div className='logo-container'>
          <img src={logoFooter} alt="Logo" className='logo-footer' />
        </div>
        <nav>
          <h3>Cursos</h3>
          <li>
            <Link to="/cursos">Kinder</Link>
          </li>
          <li>
            <Link to="/cursos">Juniors</Link>
          </li>
          <li>
            <Link to="/cursos">Teens</Link>
          </li>
          <li>
            <Link to="/cursos">Adults</Link>
          </li>
          <li>
            <Link to="/cursos">Individuales</Link>
          </li>
          <li>
            <Link to="/cursos">Empresariales</Link>
          </li>
        </nav>
        <nav className='nosotros-nav'>
          <h3>Nosotros</h3>
          <li>
            <Link to='/nosotros'>Quiénes somos</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li><Link to="/postulate">Trabajá con nosotros</Link></li>
          <li><Link to="/nosotros">Preguntas Frecuentes</Link></li>
        </nav>
        <div className='redes-footer'>
          <p>Seguinos</p>
          <div>
            <a target='_blank' rel='noreferrer' href="https://www.facebook.com/englishempirelr"><img src={fbIcon} alt="" /></a>
            <a target='_blank' rel='noreferrer' href="https://www.instagram.com/englishempirelr/"><img src={igIcon} alt="" /></a>
            <a target='_blank' rel='noreferrer' href="https://www.tiktok.com/@englishempire.lr"><img src={tiktokIcon} alt="" /></a>
          </div>
        </div>
      </footer>
      <div className='copyrigth'>
        Copyright @ 2024 English Empire Institute
      </div>
    </div>
  )
}