import { useEffect, useState } from 'react'
import '../../../styles/AdminPage/Cursos/CursosAdm.css'
import CursoCardAdm from './CursoCardAdm'
import ModificarCursoModal from './modificarCursoModal'
import { useNavigate } from 'react-router-dom'
import { getFirestore, getDocs, collection } from 'firebase/firestore'



export default function CursosAdm() {
  const [cursos, setCursos] = useState([])
  const [categories, setCategories] = useState([])
  const [categorySelectedName, setCategorySelectedId] = useState('Kinders')

  // Estado para modificar la url y que aparezca el modal
  const [cursoModificarId, setCursoModificarId] = useState(false)
  const navigate = useNavigate()

  const db = getFirestore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collection(db, 'Cursos'));
        const dataCursos = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCursos(dataCursos);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      try {
        const response = await getDocs(collection(db, 'Categorias'));
        const cat = response.docs[0].data().categorias
        setCategories(cat)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

  }, [])

  // useEffect modify cursos
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modify = queryParams.get('modify');
    if (modify) {
      setCursoModificarId(modify)
    }
  }, [cursoModificarId])


  const goBackToMenu = () => {
    navigate('../menu')
  }

  const selectedCursoChange = (e) => {
    setCategorySelectedId(e.target.value)
  }

  const modificarCurso = (id) => {
    if (id == 0) {
      setCursoModificarId(false)
      navigate('.')

    } else {
      navigate(`.?modify=${id}`)
      setCursoModificarId(id)
    }
  }

  return (
    <div className='cursos-admin-container'>
      <div className='cursos-admin--header'>
        <div className='back-to-menu-btn' onClick={goBackToMenu}>
          <i className="fa-solid fa-circle-left"></i>
        </div>
        <h2>Cursos</h2>
        <select name="filter" onChange={selectedCursoChange} defaultValue={categorySelectedName}>
          {
            categories.map(category => (
              <option name={category} key={category} value={category}>{category}</option>
            ))
          }
        </select>
      </div>
      <div className='grilla-cursos'>
        {
          cursos.filter(curso => curso.categoria == categorySelectedName).map(curso => (
            <CursoCardAdm
              key={curso.id}
              cursoName={curso.nombre}
              cursoAge={curso.edad}
              imgUrl={curso.imagen}
              id={curso.id}
              modificarCurso={modificarCurso}
            />
          ))
        }
      </div>
      {
        cursoModificarId &&
        <ModificarCursoModal
          cursos={cursos}
          id={cursoModificarId}
          modificarCurso={modificarCurso}
        />
      }
    </div>
  )
}