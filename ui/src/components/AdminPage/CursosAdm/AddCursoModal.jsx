import '../../../styles/AdminPage/Cursos/AddCursoModal.css'

export default function AddCursoModal({ modificarCurso }) {
  return (
    <div className='add-curso--container'>
      <div className='add-curso--box'>
        <button onClick={() => modificarCurso(0)}>X</button>
      </div>
    </div>
  )
}