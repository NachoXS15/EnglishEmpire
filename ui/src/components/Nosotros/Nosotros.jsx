import '../../styles/Nosotros.css'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import ProfesorCard from './ProfesorCard.jsx'
import nosAlumnos from '../../assets/nosotros/alumnos-recibidos.png'
import nosCursos from '../../assets/nosotros/cursos.png'
import nosProfesores from '../../assets/nosotros/profesores.png'
import { useEffect, useState } from 'react'

export default function Nosotros() {
  const [staff, setStaff] = useState([])

  useEffect(() => {
    fetch('https://englishempire.onrender.com/staff')
      .then((response) => response.json())
      .then((data) => {
        setStaff(data)
        console.log(data)
      })
      .catch(error => console.log('Error staff: ', error.message))

  }, [])



  return (
    <>
      <Header></Header>
      <section className='nosotros--main-container'>
        <MainBanner>¡Aprende inglés y conviértete en un ciudadano del mundo!</MainBanner>
        <div className='nosotros--second-banner'>
          <div className='second-banner--element'>
            <img src={nosAlumnos} alt="+100 Alumnos Recibidos" />
            <p>Alumnos Recibidos</p>
          </div>
          <div className='second-banner--element'>
            <img src={nosCursos} alt="12 Cursos disponibles" />
            <p>Alumnos Cursos</p>
          </div>
          <div className='second-banner--element'>
            <img src={nosProfesores} alt="6 Profesores excelentes" />
            <p>Alumnos Profesores</p>
          </div>
        </div>
        <div className='nosotros--first-text'>
          <p>
            Descubre el mundo de las posibilidades en English Empire. Ofrecemos cursos para todas las edades y niveles, desde principiantes hasta expertos.
          </p>
          <p>
            Ofrecemos cursos tanto en línea como presenciales, adaptados a todas las edades y niveles. Con profesores altamente capacitados y metodología dinámica, te garantizamos una experiencia educativa enriquecedora.
          </p>
          <p>
            ¡No pierdas la oportunidad de mejorar tus habilidades y alcanzar tus metas!
          </p>

          <b>
            ¡Inscríbete hoy y comienza tu viaje hacia el éxito!
          </b>
        </div>
        <div className='nosotros--second-text'>
          <h3>Nuestro equipo</h3>
          <p>Conoce a nuestros profesores profesionales de inglés, un equipo de expertos en la enseñanza del idioma. Cada uno de ellos tiene años de experiencia y ha dedicado su carrera a ayudar a otros a alcanzar su máximo potencial en el aprendizaje del inglés. Y también al resto del equipo que contribuyen con todo el personal docentes y al engrandecimiento institucional.</p>
        </div>
        <div className='profes-container'>
          {
            staff.map(prof => (
              <ProfesorCard
                name={prof.name}
                role={prof.cargo}
                imgUrl={`data:image/jpeg;base64,${prof.imagen}`}
                key={prof.id}
              />
            ))
          }


        </div>
        <div className='nosotros--cursos-banner'>
          <p>¡Permítenos inspirarte a alcanzar tus metas y superar tus expectativas con nuestros profesores profesionales!</p>
          <a href="/cursos">Ver cursos</a>
        </div>
      </section>
      <Footer></Footer>
    </>
  )
}