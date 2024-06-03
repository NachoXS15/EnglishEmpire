import { useState } from 'react'
import '../../../styles/AdminPage/Cursos/CursoCardAdm.css'
import defaultCursoImg from '../../../assets/adminPage/cursos_default_img.png'

export default function CursoCardAdm({ imgUrl, cursoName, cursoAge, id, modificarCurso }) {
  const [imageSrc, setImageSrc] = useState(imgUrl)

  const handleImgError = () => {
    setImageSrc(defaultCursoImg)
  }

  return (
    <div className='curso-card-adm' data-id={id} onClick={() => { modificarCurso(id) }}>
      <img src={imageSrc} alt={cursoName} onError={handleImgError} />
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