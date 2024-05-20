import { useEffect, useState } from 'react'
import '../../../styles/AdminPage/Cursos/CursosAdm.css'
import CursoCardAdm from './CursoCardAdm'
import ModificarCursoModal from './modificarCursoModal'
import { useNavigate } from 'react-router-dom'

const cursosJSON = [
  {
    name: 'Kinder "A"',
    ages: '3, 4 y 5',
    img: 'https://www.englishempire.com.ar/assets/courses/kinder/__Mobile_kinder.png',
    category: 'Kinder',
    url: '/kinder/1',
    id: '1'
  },
  {
    name: 'Juniors "A"',
    ages: '6 y 7',
    img: 'https://www.englishempire.com.ar/assets/courses/juniors/__Mobile_beginners04.png',
    category: 'Juniors',
    url: '/juniors/1',
    id: '2'
  },
  {
    name: 'Juniors "B"',
    ages: '8, 9 y 10',
    img: 'https://www.englishempire.com.ar/assets/courses/juniors/__Mobile_beginners03.png',
    category: 'Juniors',
    url: '/juniors/2',
    id: '3'
  },
  {
    name: 'Juniors "C"',
    ages: '11, 12 y 13',
    img: 'https://www.englishempire.com.ar/assets/courses/juniors/__Mobile_beginners02.png',
    category: 'Juniors',
    url: '/juniors/3',
    id: '4'
  },
  {
    name: 'Teens',
    ages: '14, 15 y 16',
    img: 'https://www.englishempire.com.ar/assets/courses/teens/__Mobile_teens01.png',
    category: 'Teens',
    url: '/teens/1',
    id: '5'
  },
  {
    name: 'Adults Principiantes (virtual)',
    ages: ['+17'],
    img: 'https://www.englishempire.com.ar/assets/courses/kinder/__Mobile_kinder.png',
    category: 'Adults',
    url: '/adults/1',
    id: '6'
  }
]

export default function CursosAdm() {
  const [categorySelected, setCategorySelected] = useState('Kinder')
  const categories = ['Kinder', 'Juniors', 'Teens', 'Adults', 'Individuales', 'Empresariales']

  // Estado para modificar la url y que aparezca el modal
  const [cursoModificarId, setCursoModificarId] = useState(0)
  const navigate = useNavigate()

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
        <select name="filter" onChange={selectedCursoChange}>
          {
            categories.map(curso => (
              <option name={curso} key={curso}>{curso}</option>
            ))
          }
        </select>
      </div>
      <div className='grilla-cursos'>
        {
          cursosJSON.map(curso => (
            curso.category == categorySelected &&
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