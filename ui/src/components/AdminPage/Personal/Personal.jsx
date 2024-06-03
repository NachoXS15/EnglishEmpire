import '../../../styles/AdminPage/Personal/Personal.css'
import { useNavigate } from 'react-router-dom'
import ProfesorCard from '../../Nosotros/ProfesorCard'
import { useState, useEffect } from 'react'
import ModificarStaffModal from './ModificarStaffModal'
import AddNewStaffModal from './AddNewStaffModal'

export default function Personal() {
  const navigate = useNavigate()
  const [staff, setStaff] = useState([])

  const [staffModificarId, setStaffModificarId] = useState('')

  const modificarStaff = (id) => {
    navigate(`.?modify=${id}`)
    setStaffModificarId(id)
  }


  useEffect(() => {
    fetch('https://englishempire.onrender.com/staff')
      .then((response) => response.json())
      .then((data) => {
        setStaff(data)
      })
      .catch(error => console.log('Error staff: ', error.message))

    const queryParams = new URLSearchParams(location.search);
    const modify = queryParams.get('modify');
    if (modify) {
      setStaffModificarId(modify)
    }

  }, [])

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
                onClick={() => modificarStaff(empleado.id)}
              >
                <i className="fa-solid fa-pen"></i>
                <ProfesorCard
                  name={empleado.name}
                  role={empleado.cargo}
                  imgUrl={empleado.imagen}
                />
              </div>
            ))
          }
          <div className='profesor-card--admin'
            onClick={() => modificarStaff('add')}
          >
            <i>+</i>
            <ProfesorCard
              name={'Agregar Personal'}
              role={'Click para añadir nuevo empleado'}
              imgUrl={''}
            >
            </ProfesorCard>

          </div>

        </div>
      </div>
      {
        staffModificarId > 0
        &&
        <ModificarStaffModal
          empleado={staff.filter(e => e.id == staffModificarId)[0]}
          id={staffModificarId}
          setId={modificarStaff}
        />
      }
      {
        staffModificarId == 'add'
        &&
        <AddNewStaffModal
          setId={modificarStaff}
        />
      }
    </div >
  )
}