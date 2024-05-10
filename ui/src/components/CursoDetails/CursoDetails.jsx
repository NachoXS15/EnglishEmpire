import { Link, useParams } from 'react-router-dom'
import '../../styles/CursoDetails.css'
import { useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import weekIcon from '../../assets/cursoDetails/icon_semanas.png'
import lessonsIcon from '../../assets/cursoDetails/icon_frecuencia.png'

export default function CursoDetails() {
  const { nivel, id } = useParams()
  const data = {
    nivel: nivel,
    id: id,
    precio: 8500,
    description: [
      '¡Bienvenidos a nuestras clases de inglés para adolescentes! En estas clases, los jóvenes de 12 años en adelante tendrán la oportunidad de desarrollar sus habilidades en el idioma inglés y alcanzar un nivel de fluidez que les permita comunicarse de manera efectiva.',
      'Nuestros profesores están altamente capacitados para trabajar con adolescentes y utilizan técnicas pedagógicas que fomentan la participación activa y el aprendizaje significativo.',
      'Además, utilizamos materiales auténticos y actuales para que los jóvenes puedan adquirir vocabulario y expresiones coloquiales que les sean útiles en situaciones cotidianas.',
      'Entre las habilidades que los adolescentes desarrollarán en nuestras clases se encuentran: comprensión auditiva, expresión oral y escrita, gramática, vocabulario y pronunciación. Además, ofrecemos clases temáticas en las que se abordan temas de actualidad, cultura, deportes y otros temas de interés para los jóvenes.',
      'Nuestro objetivo es ayudar a los adolescentes a alcanzar un nivel de inglés que les permita desenvolverse en situaciones académicas, sociales y profesionales en un mundo cada vez más globalizado.',
      '¡Inscribir a tu hijo en nuestras clases de inglés para adolescentes es una inversión en su futuro! ¡Aprender un segundo idioma es una herramienta valiosa para su desarrollo personal y profesional!'

    ],
    duration: 40,
    weeklyLessons: 1,
    inicio: 'Marzo',
    final: 'Diciembre'
  }

  return (
    <>
      <Header></Header>
      <section className='cursoDetails-container'>
        <div className='curso-banner'>
          <p>{nivel.charAt(0).toLocaleUpperCase() + nivel.slice(1)}</p>
        </div>
        <div className='curso-description'>
          <div className='text-description'>
            {data.description.map(parrafo => (
              <p className='parrafo-description' key={parrafo}>{parrafo}</p>
            ))}
          </div>
          <div className='price-description'>
            <div className='price-description--card'>
              <h2>${data.precio.toString().charAt(0)}.{data.precio.toString().slice(1)}</h2>
              <Link to={`/inscripcion/${id}`} className='inscription-btn'>Inscribirme</Link>
              <div className="card--duration">
                <p>
                  <img src={weekIcon} alt="" />
                  {data.duration} semanas
                </p>
                <p>
                  <img src={lessonsIcon} alt="" />
                  {data.weeklyLessons} clase semanal
                </p>
              </div>
              <div className='card--inicio-final'>
                <div>
                  <p className='card--red-text'>Fecha de inicio</p>
                  <p>{data.inicio}</p>
                </div>
                <div>
                  <p className='card--red-text'>Fecha de inicio</p>
                  <p>{data.final}</p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>
      <Footer></Footer>
    </>
  )
}