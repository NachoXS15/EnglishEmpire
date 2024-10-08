import { Link } from 'react-router-dom'
import '../../styles/CourseCard.css'
import { useEffect, useState } from 'react'
import individuales_photo from '../../assets/cursoDetails/individuales.png'
import empresariales_photo from '../../assets/cursoDetails/empresariales.png'

export function CourseCard({ curso }) {

  const [linkTo, setLinkTo] = useState('')

  useEffect(() => {
    if (curso.categoria == 'Individuales') {
      setLinkTo('/individuales')
      curso.imagen = individuales_photo
    } else if (curso.categoria == 'Empresariales') {
      setLinkTo('/empresariales')
      curso.imagen = empresariales_photo
    } else if (curso.categoria) {
      setLinkTo(`/cursos/${curso.categoria}/${curso.nombre.replace(/\s+/g, "")}`)
    }
  })

  return (
    <>
      <Link
        className='curso-card'
        to={linkTo}
      >

        <img src={curso.imagen} alt="cursoLogo" />
        <div>
          <p>{curso.nombre}</p>
          <p>{curso.edades}</p>
        </div>
      </Link>
    </>
  )
}