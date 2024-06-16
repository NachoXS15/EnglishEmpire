import '../../../styles/AdminPage/Cursos/ModificarCursoModal.css'
import { useEffect, useState } from 'react'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'

export default function ModificarCursoModal({ curso, navigateTo, categories, categorySelectedName }) {

  const [cursoModificado, setCursoModificado] = useState({
    ...curso
  })
  const [noChanges, setNoChanges] = useState(false)
  const [actualizarCursoModal, setActualizarCursoModal] = useState(false)
  const [descartarCambiosModal, setDescartarCambiosModal] = useState(false)
  const [deleteCursoModal, setDeleteCursoModal] = useState(false)
  const [imgSubida, setImgSubida] = useState('')
  const db = getFirestore()

  useEffect(() => {
    setDescartarCambiosModal(false)
    setActualizarCursoModal(false)
  }, [])

  const actualizarCurso = (e) => {
    e.preventDefault()
    setNoChanges(false)
    if (
      cursoModificado.nombre == curso.nombre &
      cursoModificado.edad == curso.edad &
      cursoModificado.categoria == curso.categoria &
      cursoModificado.categoria == curso.categoria &
      cursoModificado.clasesSemanales == curso.clasesSemanales &
      cursoModificado.inicio == curso.inicio &
      cursoModificado.duracion == curso.duracion &
      cursoModificado.descripcion == curso.descripcion &
      imgSubida == ''
    ) {
      setNoChanges(true)
    } else {
      if (e.target.innerText == 'asConfirmar') {
        setActualizarCursoModal(false)
        navigateTo(0)
      } else if (e.target.classList[0] == 'fa-solid' || e.target.classList[0] == 'no-actualizar-curso') {
        setActualizarCursoModal(false)
      } else {
        setActualizarCursoModal(true)
      }
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
        const docRef = doc(db, "Cursos", cursoModificado.id);
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

  const handleInputChange = (e) => {
    setCursoModificado({
      ...cursoModificado,
      [e.target.id]: e.target.value
    })
  }


  return (
    <div className="modificar-curso-container">
      <div className='modificar-curso-box'>
        <h2>Modificar curso</h2>
        <h3>{curso.nombre}</h3>
        <form className='modificar-form-cursos'>
          <div>
            <label htmlFor="nombre">Nombre del curso</label>
            <input type="text" id="nombre" onChange={handleInputChange} defaultValue={cursoModificado.nombre} />
          </div>
          <div>
            <label htmlFor="categoria">Categoria del curso</label>
            <select name="categories" id="categoria" onChange={handleInputChange} defaultValue={categorySelectedName}>
              {
                categories.map(category => (
                  <option name={category} key={category} value={category}>{category}</option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="inicio">Inicio del curso</label>
            <input type="text" id='inicio' onChange={handleInputChange} defaultValue={cursoModificado.inicio} />
          </div>
          <div>
            <label htmlFor="fin">Fin del curso</label>
            <input type="text" id='fin' onChange={handleInputChange} defaultValue={cursoModificado.fin} />
          </div>
          <div>
            <label htmlFor="duracion">Duración</label>
            <input type="text" name="duracion" id="duracion" onChange={handleInputChange} defaultValue={cursoModificado.duracion} />
          </div>
          <div>
            <label htmlFor="edades">Edades</label>
            <input type="text" id='edades' onChange={handleInputChange} defaultValue={cursoModificado.edades} />
          </div>
          <div>
            <label htmlFor="imagen">Imagen del curso</label>
            <label htmlFor="imagen" className='programa-label'>
              Seleccionar Archivo
            </label>
            <input type="file" id='imagen' accept='.jpeg, .jpg, .png' />
          </div>
          <div>
            <label htmlFor="descripcion" className='descripcion-label'>Descripcion del curso</label>
            <textarea name="descripcion" id="descripcion" onChange={handleInputChange} defaultValue={cursoModificado.descripcion}></textarea>
          </div>
          <div>
            <label htmlFor="linkPago">Link de pago </label>
            <input type="text" id='linkPago' onChange={handleInputChange} defaultValue={cursoModificado.linkPago} />
          </div>
          {
            noChanges &&
            <div>
              <p>Ningún cambio realizado</p>
            </div>
          }
          <div className='modificar-curso-btns'>
            <button onClick={actualizarCurso}>Actualizar curso</button>
            <button onClick={handleDeleteCurso}>Eliminar Curso</button>
          </div>

        </form>
        <div className='salir-modificar' onClick={() => {
          setDescartarCambiosModal(true)
        }}>X</div>

      </div >
      {
        deleteCursoModal &&
        <div className='delete-curso-modal'>
          <div>
            <p>¿Eliminar {curso.nombre}?</p>
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



    </div >
  )

}