import { Link } from 'react-router-dom'
import '../../styles/CourseCard.css'

export function CourseCard({ curso }) {

  return (
    <Link className='curso-card' to={`/cursos/${curso.categoria}/${curso.nombre.replace(/\s+/g, "")}`}>
      <img src={curso.imagen} alt="cursoLogo" />
      <div>
        <p>{curso.nombre}</p>
        <p>{curso.edades}</p>
      </div>
    </Link>
  )
}