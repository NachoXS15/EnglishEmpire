import { useState } from 'react'
import logo from '../assets/logo.png'
import menulistsvg from '../assets/svgs/menu-list.svg'
import exitmenulistsvg from '../assets/svgs/exit-menu-list.svg'
import '../styles/Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(true)

  const handleMenuClick = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <header>
      <nav className="navigation">
        <a href="/">
          <img src={logo} alt="logo" className="logo" loading="lazy" />
        </a>
        <div className="menu-bar-svg">
          <img src={menuOpen ? menulistsvg : exitmenulistsvg} onClick={handleMenuClick} />
        </div>
        <ul className={`navigation-list ${!menuOpen ? 'nav-visible' : ''}`}>
          <li>
            <a className='a' href="/">Inicio</a>
          </li>
          <li>
            <a href="/cursos">Cursos</a>
          </li>
          <li>
            <a href="/nosotros">Nosotros</a>
          </li>
          <li>
            <a href="/postulate">Trabaja con nosotros</a>
          </li>
          <li>
            <a href="/contacto">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}