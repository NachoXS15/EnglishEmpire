import { Link, useParams } from 'react-router-dom'
import Header from "../Header"
import Footer from "../Footer"
import weekIcon from '../../assets/cursoDetails/icon_semanas.png'
import lessonsIcon from '../../assets/cursoDetails/icon_frecuencia.png'
import { useEffect, useState } from "react"

const cursosPersonalizados = [
  {
    id: "1",
    nombre: "Clases individuales",
    edades: "Todas las edades!",
    categoria: "Individuales",
    descripcion: 'Clases personalizadas para alumnos que no desean unirse a un grupo, ya sea por horario o por necesidades personales. Ya que estas clases responden a necesidades puntuales, estas clases son exclusivamente individuales.\n\nEsta modalidad, como el resto de nuestros cursos, se dicta de manera presencial o mediante VIDEOCONFERENCIA.\n\nSon también ideales para aquellas personas que necesiten desarrollar su Inglés en un área específica, ya sea Inglés técnico, laboral o bien para personas que van a realizar un viaje al exterior y necesitan refrescar su Inglés.\n\n Los contenidos del curso son flexibles y los objetivos son acordados entre el profesor y el alumno al comienzo del curso. Es más, se invita a que el alumno traiga consigo cualquier tipo de material o documentos que quiera sean incluidos y trabajados en curso.\n\nContamos con una alta experiencia en preparación para ingreso al Profesorado de Inglés y Traductorado de Inglés, como así también su seguimiento en las materias inglesas de cursado.\n\nTambién con una vasta experiencia en la preparación de exámenes de carreras universitarias como medicina, enfermería, nutrición, kinesiología, odontología, contador, administración de empresas, economía, abogacía.\n\nApoyo Escolar Para alumnos de colegios bilingües y no bilingües que necesitan una ayuda para sus clases. Algunos alumnos necesitan asistir regularmente y otros sólo toman estas clases hasta comprender un tema o aclarar dudas. O bien para preparar los exámenes de mitad o fin de año.\n\nNuestras docentes cuentan con amplia experiencia en la preparación de exámenes en Diciembre, Marzo y previas.'

  },
  {
    id: "2",
    nombre: "Clases empresariales",
    edades: "Todas las edades!",
    categoria: "Empresariales",
    descripcion: 'Bienvenidos a nuestro curso de inglés para adultos de nivel avanzado. Nuestro programa está diseñado para ayudar a aquellos que ya tienen un conocimiento básico del idioma a mejorar y consolidar sus habilidades lingüísticas.\n\nNuestros profesores altamente capacitados ofrecen sesiones dinámicas y motivadoras para ayudar a los estudiantes a mejorar su comprensión auditiva, gramática, pronunciación, vocabulario y habilidades de comunicación. Además, en nuestras clases se trabajan habilidades como la escritura y la lectura para que los estudiantes puedan mejorar su capacidad para comunicarse efectivamente en diferentes situaciones.\n\nEn nuestras sesiones, los estudiantes tendrán la oportunidad de interactuar con otros estudiantes que comparten su nivel de habilidad en el idioma, lo que les permitirá practicar y mejorar su capacidad de comunicación en inglés. Además, ofrecemos una variedad de recursos y materiales de aprendizaje, como ejercicios prácticos, discusiones en grupo, y actividades lúdicas.\n\nSi estás buscando llevar tus habilidades en inglés al siguiente nivel, nuestras clases de inglés para adultos intermedios son para ti. Únete a nuestra comunidad de estudiantes de inglés intermedios y comienza a desarrollar tus habilidades en el idioma hoy mismo.'
  }

]
export default function Personalizados({ tipo }) {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [curso, setCurso] = useState({})

  useEffect(() => {
    if (tipo == 'Individuales') {
      let desc = cursosPersonalizados[0].descripcion.split('\n\n')
      setCurso({
        ...cursosPersonalizados[0],
        descripcion: desc
      })
    } else {
      let desc = cursosPersonalizados[1].descripcion.split('\n\n')
      setCurso({
        ...cursosPersonalizados[1],
        descripcion: desc
      })
    }
  }, [])


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);

      }
    };

    window.addEventListener('resize', handleResize);

    // Limpieza del evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header></Header>
      <section className='cursoDetails-container'>
        <div className='curso-banner'>
          <p>{curso.nombre}</p>
          {
            isMobile &&
            <div className="card--duration">
              <p>Presencial u online</p>
            </div>
          }
        </div>
        <div className='curso-description'>
          <div className='text-description'>
            {
              curso.descripcion ?
                curso.descripcion.map(parrafo => (
                  <p className='parrafo-description' key={parrafo}>{parrafo}</p>
                )) : <p>Cargando Curso...</p>
            }
          </div>
          <div className='price-description'>
            <div className='price-description--card'>
              <p style={{ padding: '12px', textAlign: 'center' }}>¡Escribinos para concretar una reunión!</p>
              <Link to={'/contacto'} className='inscription-btn' disabled>Consultar</Link>
            </div>
          </div>

        </div>
      </section>
      <Footer></Footer>
    </>
  )
}