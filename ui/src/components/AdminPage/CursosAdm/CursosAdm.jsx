import { useEffect, useState } from 'react'
import '../../../styles/AdminPage/Cursos/CursosAdm.css'
import CursoCardAdm from './CursoCardAdm'
import ModificarCursoModal from './modificarCursoModal'
import { useNavigate } from 'react-router-dom'



export default function CursosAdm() {
  const [cursos, setCursos] = useState([])
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState('Kinders')

  // Estado para modificar la url y que aparezca el modal
  const [cursoModificarId, setCursoModificarId] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('https://englishempire.onrender.com/cursos');
        const data = await response.json();
        setCursos(data);
        console.log(cursos);
      } catch (error) {
        console.error('Error fetching cursos: ', error.message);
      }
    };
  
    const fetchCategories = async() => {
      try {
        const response = await fetch('https://englishempire.onrender.com/categories')
        const data = await response.json();
        setCategories(data)
      } catch (error) {
        console.log('Error fecthing categorias: ', error.message);
      }
    }
    
    fetchCursos();
    fetchCategories();
  }, []);

  const goBackToMenu = () => {
    navigate('../menu')
  }

  const selectedCursoChange = (e) => {
    setCategorySelected(e.target.value)
  }

  const modificarCurso = (id) => {
    navigate(`.?modify=${id}`)
    setCursoModificarId(id)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modify = queryParams.get('modify');


    if (modify) {
      setCursoModificarId(modify)
    }
  }, [cursoModificarId])


  return (
    <div className='cursos-admin-container'>
      <div className='cursos-admin--header'>
        <div className='back-to-menu-btn' onClick={goBackToMenu}>
          <i className="fa-solid fa-circle-left"></i>
        </div>
        <h2>Cursos</h2>
        <select name="filter" onChange={selectedCursoChange} value={categorySelected}>
          {
            categories.map(category => (
              <option name={category.name} key={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className='grilla-cursos'>
        {
          cursos.map(curso => (
            // curso.category == categorySelected &&
            <CursoCardAdm
              key={curso.id}
              cursoName={curso.name}
              cursoAge={curso.ages}
              imgUrl={curso.img}
              id={curso.id}
              modificarCurso={modificarCurso}
            />
          ))
        }
      </div>
      {
        cursoModificarId > 0
        &&
        <ModificarCursoModal
          id={cursoModificarId}
          modificarCurso={modificarCurso}
        />
      }
    </div>
  )
}