import '../../../styles/AdminPage/Cursos/CursoCardAdm.css'

export default function CursoCardAdm({ imgUrl, cursoName, cursoAge, id, modificarCurso }) {
  return (
    <div className='curso-card-adm' data-id={id} onClick={() => { modificarCurso(id) }}>
      <img src={imgUrl} alt={cursoName} />
      <div>
        <p>{cursoName}</p>
        <p>{cursoAge}</p>
      </div>
      <button className='modify'>
        <i className="fa-solid fa-pen"></i>
      </button>
    </div>
  )
}