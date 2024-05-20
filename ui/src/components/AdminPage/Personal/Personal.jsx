import '../../../styles/AdminPage/Personal/Personal.css'
import { useNavigate } from 'react-router-dom'
import ProfesorCard from '../../Nosotros/ProfesorCard'
import { useState, useEffect } from 'react'
import ModificarStaffModal from './ModificarStaffModal'

// const staff = [
//   {
//     name: 'Juan Davila',
//     role: 'President',
//     imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
//   },
//   {
//     name: 'Davila Juan',
//     role: 'President',
//     imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
//   },
//   {
//     name: 'Nicolás Lujan',
//     role: 'Desarrollo y Tech',
//     imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
//   },
//   {
//     name: 'Marco Gavio',
//     role: 'Ex-Profesor',
//     imgURL: 'https://www.englishempire.com.ar/assets/profesores/400x400/Juan.jpg'
//   }
// ]


export default function Personal() {
  const navigate = useNavigate()
  const [staff, setStaff] = useState([])

  const [staffModificarId, setStaffModificarId] = useState('')

  const modificarStaff = (id) => {
    navigate(`.?modify=${id}`)
    setStaffModificarId(id)
  }

  fetch('https://englishempire.onrender.com/staff')
  .then((response) => response.json())
  .then((data) => setStaff(data))
  .catch(console.log("Error al traer Staff :("))

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modify = queryParams.get('modify');
    if (modify) {
      setStaffModificarId(modify)
    }

  }, [staffModificarId])

  const goBackToMenu = () => {
    navigate('../menu')
  }

  return (
    <div className='personal-body'>
      <div className='personal-container'>
        <div className='personal--header'>
          <i onClick={goBackToMenu} className="fa-solid fa-circle-left"></i>
          <h2>Personal</h2>
        </div>
        <div className='personal--cards-container'>
          {
            staff.map(empleado => (
              <div className='profesor-card--admin' key={empleado.name}
                onClick={() => modificarStaff(empleado.name)}
              >
                <i className="fa-solid fa-pen"></i>
                <ProfesorCard
                  name={empleado.name}
                  role={empleado.role}
                  imgUrl={empleado.imgURL}
                />
              </div>
            ))
          }
        </div>
      </div>
      {
        staffModificarId.length > 0
        &&
        <ModificarStaffModal
          id={staffModificarId}
          modificarStaff={modificarStaff}
        />
      }
    </div >
  )
}