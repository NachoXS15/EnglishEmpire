import { useEffect, useState } from 'react'
import '../../../styles/AdminPage/Cursos/CursosAdm.css'
import CursoCardAdm from './CursoCardAdm'
import ModificarCursoModal from './modificarCursoModal'
import { useNavigate } from 'react-router-dom'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import AddCursoModal from './AddCursoModal'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// ARREGLAR PROBLEMA DE SUBIR IMG

export default function CursosAdm() {
  const [cursos, setCursos] = useState([])
  const [categories, setCategories] = useState([])
  const [categorySelectedName, setCategorySelectedId] = useState('Kinders')
  // Estado para modificar la url y que aparezca el modal
  const [cursoModificarId, setCursoModificarId] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  // verificar si hay usuario registrado

  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        navigate('../administracion')
      }
    });

    return () => unsubscribe();
  }, [auth, navigate])


  // traer cursos de firebase
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

  const navigateTo = (id) => {
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
      </div>
      <select name="filter" onChange={selectedCursoChange}>
        {
          categories.map(category => (
            <option name={category} key={category} value={category}>{category}</option>
          ))
        }
      </select>
      <div className='grilla-cursos'>
        {
          cursos.filter(curso => curso.categoria == categorySelectedName).map(curso => (
            <CursoCardAdm
              key={curso.id}
              cursoName={curso.nombre}
              cursoAge={curso.edades}
              imgUrl={curso.imagen}
              id={curso.id}
              navigateTo={navigateTo}
            />
          ))
        }

      </div>
      <div>
        <button className='add-curso-btn' onClick={() => { navigateTo('add') }}>Agregar Curso</button>
      </div>

      {
        (cursoModificarId && cursoModificarId != 'add') &&
        <ModificarCursoModal
          curso={cursos.filter(curso => curso.id == cursoModificarId)[0]}
          id={cursoModificarId}
          navigateTo={navigateTo}
          categories={categories}
          categorySelectedName={categorySelectedName}
        />
      }
      {
        cursoModificarId == 'add' &&
        <AddCursoModal
          navigateTo={navigateTo}
          categories={categories}
          categorySelectedName={categorySelectedName}
        />
      }
    </div>
  )
}