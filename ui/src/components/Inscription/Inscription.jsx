import '../../styles/Inscription.css'
import Header from '../Header'
import Footer from '../Footer'
import { MainBanner } from '../MainBanner'

export default function Inscription() {

  const listOfCourses = [
    'Kinder "A"',
    'Kinder "B"',
    'Kinder "C"',
    'Kinder "D"',
    'Kinder "D"',
    'Kinder "D"',
    'Kinder "D"',
    'Kinder "D"',
    'Kinder "D"',
    'Kinder "D"',
    'Kinder "D"',
  ]

  return (
    <>
      <Header></Header>
      <section className='inscription-container'>
        <MainBanner>Inscripcion</MainBanner>
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
            <div className='form-element'>
              <label htmlFor="curso">
                Curso
                <span>*</span>
              </label>

              <select className='select-element' name="curso" id="curso">
                <option value="" selected>Seleccionar...</option>
                {listOfCourses.map(course => (
                  <option key={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className='form-element'>
              <label htmlFor="tutor">
                Con tutor/a
                <span>*</span>
                <p>Si sos menor de edad, debes agregar los datos de tu tutor/a.</p>
              </label>


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