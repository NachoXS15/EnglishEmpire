import '../../../styles/AdminPage/Cursos/ModificarCursoModal.css'
import { useEffect, useState } from 'react'



export default function ModificarCursoModal({ cursos, id, modificarCurso }) {

  const [cursoAModificar, setCursoAModificar] = useState({})
  const [actualizarCursoModal, setActualizarCursoModal] = useState(false)
  const [descartarCambiosModal, setDescartarCambiosModal] = useState(false)

  useEffect(() => {
    console.log(cursos)
    setCursoAModificar(cursos.filter(curso => id == curso.id)[0])
    setDescartarCambiosModal(false)
    setActualizarCursoModal(false)
  }, [])

  const actualizarCurso = (e) => {
    e.preventDefault()
    if (e.target.innerText == 'Confirmar') {
      setActualizarCursoModal(false)
      modificarCurso(0)
    } else if (e.target.classList[0] == 'fa-solid' || e.target.classList[0] == 'no-actualizar-curso') {
      setActualizarCursoModal(false)
    } else {
      setActualizarCursoModal(true)
    }
  }

  const descartarCambios = (e) => {
    e.preventDefault()
    if (descartarCambiosModal) {
      if (e.target.innerText == 'Si') {
        setDescartarCambiosModal(false)
        modificarCurso(0)
      } else if (e.target.innerText == 'No') {
        setDescartarCambiosModal(false)
      }
    } else {
      setDescartarCambiosModal(true)
    }
  }


  return (
    <div className="modificar-curso-container">
      <div className='modificar-curso-box'>
        <h2>Modificar curso</h2>
        <h3>{cursoAModificar.nombre}</h3>
        <form className='modificar-form-cursos'>
          <div>
            <label htmlFor="name">Nombre del curso</label>
            <input type="text" id='name' defaultValue={cursoAModificar.nombre} />
          </div>
          <div>
            <label htmlFor="categories">Categoria del curso</label>
            <select name="categories" id="categories">
              <option value="Kinder">Kinder</option>
              <option value="Teens">Teens</option>
              <option value="Adults">Adults</option>
            </select>
          </div>
          <div>
            <label htmlFor="inicio">Inicio del curso</label>
            <input type="date" id='inicio' />
          </div>
          <div>
            <label htmlFor="fin">Fin del curso</label>
            <input type="date" id='fin' />
          </div>
          <div>
            <label htmlFor="duracion">Duración</label>
            <input type="text" name="duracion" id="duracion" />
          </div>
          <div>
            <label htmlFor="ages">Edades</label>
            <input type="text" id='ages' defaultValue={cursoAModificar.edad} />
          </div>
          <div>
            <label htmlFor="">Programa del curso</label>
            <label htmlFor="programa" className='programa-label'>
              Seleccionar Archivo
            </label>
            <input type="file" id='programa' />
          </div>
          <div>
            <label htmlFor="descripcion">Descripcion del curso</label>
            <textarea name="descripcion" id="descripcion"></textarea>
          </div>
          <div className='modificar-curso-btns'>
            <button onClick={actualizarCurso}>Actualizar curso</button>
          </div>
        </form>
        <div className='salir-modificar' onClick={() => {
          setDescartarCambiosModal(true)
        }}>X</div>
      </div>
      {/* Descartar cambios modal */}
      <div className={`descartar-cambios-modal ${!descartarCambiosModal ? 'disabled' : ''}`}>
        <div className='descartar-cambios-box'>
          <p>¿Deseas descartar los cambios realizados?</p>
          <div>
            <button onClick={descartarCambios}>Si</button>
            <button onClick={descartarCambios}>No</button>
          </div>
        </div>
      </div>
      <div className={`actualizar-curso-modal ${!actualizarCursoModal ? 'disabled' : ''}`}>
        <div className='actualizar-curso-box'>
          <p>¿Actualizar curso?</p>
          <button onClick={actualizarCurso}>Confirmar</button>
          <div className='no-actualizar-curso' onClick={actualizarCurso}>
            <i className="fa-solid fa-x"></i>
          </div>
        </div>
      </div>
    </div>
  )

}