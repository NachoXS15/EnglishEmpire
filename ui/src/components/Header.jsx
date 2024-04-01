import { useState } from 'react'
import logo from '../assets/logo.png'
import menulistsvg from '../assets/svgs/menu-list.svg'
import exitmenulistsvg from '../assets/svgs/exit-menu-list.svg'
import { Link } from 'react-router-dom'
import '../styles/Header.css'


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(true)

  const handleMenuClick = () => {
    setMenuOpen(prev => !prev)
  }

  const handleLinkClicked = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <header>
      <nav className="navigation">
        <Link onClick={handleLinkClicked} to="/">
          <img src={logo} alt="logo" className="logo" loading="lazy" />
        </Link>
        <div className="menu-bar-svg">
          <img src={menuOpen ? menulistsvg : exitmenulistsvg} onClick={handleMenuClick} />
        </div>
        <ul className={`navigation-list ${!menuOpen ? 'nav-visible' : ''}`}>
          <li>
            <Link onClick={handleLinkClicked} to="/">Inicio</Link>
          </li>
          <li>
            <Link onClick={handleLinkClicked} to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link onClick={handleLinkClicked} to="/nosotros">Nosotros</Link>
          </li>
          <li>
            <Link onClick={handleLinkClicked} to="/postulate">Trabaja con nosotros</Link>
          </li>
          <li>
            <Link onClick={handleLinkClicked} to="/contacto">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}