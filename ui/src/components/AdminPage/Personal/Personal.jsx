import '../../../styles/AdminPage/Personal/Personal.css'
import { useNavigate } from 'react-router-dom'
import ProfesorCard from '../../Nosotros/ProfesorCard'
import { useState, useEffect } from 'react'
import ModificarStaffModal from './ModificarStaffModal'
import AddNewStaffModal from './AddNewStaffModal'
import { getDocs, getFirestore, collection } from 'firebase/firestore'

export default function Personal() {
  const navigate = useNavigate()
  const [staff, setStaff] = useState([])
  const [staffModificarId, setStaffModificarId] = useState(false)

  const modificarStaff = (id) => {
    if (id == 0) {
      setStaffModificarId(false)
      navigate('.')

    } else {
      navigate(`.?modify=${id}`)
      setStaffModificarId(id)
    }
  }

  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collection(db, 'Staff'));
        const dataList = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStaff(dataList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

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
              <div className='profesor-card--admin' key={empleado.nombre}
                onClick={() => modificarStaff(empleado.id)}
              >
                <i className="fa-solid fa-pen"></i>
                <ProfesorCard
                  name={empleado.nombre}
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
        staffModificarId & staffModificarId != 'add' &&
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