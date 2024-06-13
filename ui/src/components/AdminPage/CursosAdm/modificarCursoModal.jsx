import '../../../styles/AdminPage/Cursos/ModificarCursoModal.css'
import { useEffect, useState } from 'react'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'

export default function ModificarCursoModal({ cursos, id, navigateTo, categories, categorySelectedName }) {

  const [cursoAModificar, setCursoAModificar] = useState({})
  const [actualizarCursoModal, setActualizarCursoModal] = useState(false)
  const [descartarCambiosModal, setDescartarCambiosModal] = useState(false)
  const [deleteCursoModal, setDeleteCursoModal] = useState(false)
  const db = getFirestore()

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
        navigateTo(0)
      } else if (e.target.innerText == 'No') {
        setDescartarCambiosModal(false)
      }
    } else {
      setDescartarCambiosModal(true)
    }
  }

  const handleDeleteCurso = async (e) => {
    e.preventDefault()
    setDeleteCursoModal(true)
    console.log(deleteCursoModal)
    if (e.target.innerText == 'Si') {
      try {
        const docRef = doc(db, "Cursos", cursoAModificar.id);
        await deleteDoc(docRef);
        alert("Documento eliminado correctamente");
        navigateTo(0)
        window.location.reload(); // Recargar la página después de eliminar el documento
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Ocurrió un error al eliminar el documento. Por favor, inténtalo de nuevo.");
      }
    } else if (e.target.innerText == 'No') {
      setDeleteCursoModal(false)
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
            <select name="categories" id="categories" defaultValue={categorySelectedName}>
              {
                categories.map(category => (
                  <option name={category} key={category} value={category}>{category}</option>
                ))
              }
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
            <button onClick={handleDeleteCurso}>Eliminar Curso</button>
          </div>
        </form>
        <div className='salir-modificar' onClick={() => {
          setDescartarCambiosModal(true)
        }}>X</div>

      </div>
      {
        deleteCursoModal &&
        <div className='delete-curso-modal'>
          <div>
            <p>¿Eliminar {cursoAModificar.nombre}?</p>
            <div>
              <button onClick={handleDeleteCurso}>Si</button>
              <button onClick={handleDeleteCurso}>No</button>
            </div>
          </div>
        </div>
      }
      {
        descartarCambiosModal &&
        <div className='descartar-cambios-modal'>
          <div className='descartar-cambios-box'>
            <p>¿Deseas descartar los cambios realizados?</p>
            <div>
              <button onClick={descartarCambios}>Si</button>
              <button onClick={descartarCambios}>No</button>
            </div>
          </div>
        </div>
      }
      {
        actualizarCursoModal &&
        <div className="actualizar-curso-modal">
          <div className='actualizar-curso-box'>
            <p>¿Actualizar curso?</p>
            <button onClick={actualizarCurso}>Confirmar</button>
            <div className='no-actualizar-curso' onClick={actualizarCurso}>
              <i className="fa-solid fa-x"></i>
            </div>
          </div>
        </div>
      }



    </div>
  )

}