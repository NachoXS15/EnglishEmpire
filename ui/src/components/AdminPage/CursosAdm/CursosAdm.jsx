import { useEffect, useState } from 'react'
import '../../../styles/AdminPage/Cursos/CursosAdm.css'
import CursoCardAdm from './CursoCardAdm'
import ModificarCursoModal from './modificarCursoModal'
import { useNavigate } from 'react-router-dom'



export default function CursosAdm() {
  const [cursos, setCursos] = useState([])
  const [categories, setCategories] = useState([])
  const [categorySelectedId, setCategorySelectedId] = useState(3)

  // Estado para modificar la url y que aparezca el modal
  const [cursoModificarId, setCursoModificarId] = useState(0)
  const navigate = useNavigate()

  // useEffect para fetchear datos de cursos
  useEffect(() => {
    fetch('https://englishempire.onrender.com/cursos')
      .then(res => res.json())
      .then(dataCursos => {
        let cursosFiltered = dataCursos.filter(curso => curso.categoryId == categorySelectedId)
        setCursos(cursosFiltered)
      })
      .catch(err => {
        console.log('Error fetching cursos: ', err.message)
      })
  }, [categorySelectedId]);

  // useEffect para fetchear categories
  useEffect(() => {
    fetch('https://englishempire.onrender.com/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => {
        console.log('Error fetching categories: ', err.message)
      })
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
    navigate(`.?modify=${id}`)
    setCursoModificarId(id)
  }

  return (
    <div className='cursos-admin-container'>
      <div className='cursos-admin--header'>
        <div className='back-to-menu-btn' onClick={goBackToMenu}>
          <i className="fa-solid fa-circle-left"></i>
        </div>
        <h2>Cursos</h2>
        <select name="filter" onChange={selectedCursoChange} defaultValue={categorySelectedId}>
          {
            categories.map(category => (
              <option name={category.name} key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className='grilla-cursos'>
        {
          cursos.map(curso => (
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