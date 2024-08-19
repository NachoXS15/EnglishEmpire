import { useState } from 'react'
import '../../styles/ProfesorCard.css'
import defaultStaffPic from '../../assets/adminPage/default_staff_pic.png'

export default function ProfesorCard({ name, role, imgUrl }) {
  const [imgSrc, setImgSrc] = useState(imgUrl)

  const handleImgError = () => {
    setImgSrc(defaultStaffPic)
  }

  return (
    <div className="profesor-card">
      <img src={imgSrc} alt={role} onError={handleImgError} />
      <p className='profesor-card--name'>{name}</p>
      <p className='profesor-card--role'>{role}</p>
    </div>
  )
}