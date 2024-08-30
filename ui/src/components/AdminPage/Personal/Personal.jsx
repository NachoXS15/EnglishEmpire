import '../../../styles/AdminPage/Personal/Personal.css'
import { useNavigate } from 'react-router-dom'
import ProfesorCard from '../../Nosotros/ProfesorCard'
import { useState, useEffect } from 'react'
import ModificarStaffModal from './ModificarStaffModal'
import AddNewStaffModal from './AddNewStaffModal'
import { getDocs, getFirestore, collection } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Personal() {
  const navigate = useNavigate()
  const [staff, setStaff] = useState([])
  const [staffModificarId, setStaffModificarId] = useState(false)

  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
      } else {
        navigate('../administracion')
      }
    });

    return () => unsubscribe();
  }, [auth, navigate])


  const db = getFirestore();

  const fetchData = async () => {

    const cargoPrioridad = {
      'Presidente': 1,
      'Secretaria': 5,
      'Secretario': 5,
      'Manejo de RRSS': 7,
      'Profesora': 10,
      'Profesor': 10
    };

    try {
      const response = await getDocs(collection(db, 'Staff'));
      const dataList = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const empleadosOrdenados = dataList.sort((a, b) => {
        return cargoPrioridad[a.cargo] - cargoPrioridad[b.cargo];
      });
      setStaff(empleadosOrdenados);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])


  const goBackToMenu = () => {
    navigate('../menu')
  }

  const navigateTo = (id) => {
    if (id == 0) {
      setStaffModificarId(false)
      navigate('.')

    } else {
      navigate(`.?modify=${id}`)
      setStaffModificarId(id)
    }
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
            staff && staff.map(empleado => (
              <div className='profesor-card--admin' key={empleado.nombre}
                onClick={() => navigateTo(empleado.id)}
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
            onClick={() => navigateTo('add')}
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
        (staffModificarId && staffModificarId != 'add') &&
        <ModificarStaffModal
          empleado={staff.filter(e => e.id == staffModificarId)[0]}
          id={staffModificarId}
          setId={navigateTo}
          fetchData={fetchData}
        />
      }
      {
        staffModificarId == 'add'
        &&
        <AddNewStaffModal
          setId={navigateTo}

        />
      }
    </div >
  )
}