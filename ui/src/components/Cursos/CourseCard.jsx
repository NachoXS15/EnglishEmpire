import { Link } from 'react-router-dom'
import '../../styles/CourseCard.css'

export function CourseCard({ imgUrl, cursoName, cursoAge, url }) {

  return (
    <Link className='curso-card' to={`/cursos${url}`}>
      <img src={imgUrl} alt="cursoLogo" />
      <div>
        <p>{cursoName}</p>
        <p>{cursoAge}</p>
      </div>
    </Link>
  )
}