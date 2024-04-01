import '../../styles/ProfesorCard.css'

export default function ProfesorCard({ name, role, imgUrl }) {
  return (
    <div className="profesor-card">
      <img src={imgUrl} alt={role} />
      <p className='profesor-card--name'>{name}</p>
      <p className='profesor-card--role'>{role}</p>
    </div>
  )
}