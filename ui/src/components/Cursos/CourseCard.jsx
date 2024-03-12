import '../../styles/CourseCard.css'

export function CourseCard({ url, cursoName, cursoAge }) {

  return (
    <div className='curso-card'>
      <img src={url} alt="cursoLogo" />
      <div>
        <p>{cursoName}</p>
        <p>{cursoAge}</p>
      </div>
    </div>
  )
}