import { useNavigate } from 'react-router-dom'
import '../../../styles/AdminPage/Cursos/ModificarCursoModal.css'


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

export default function ModificarCursoModal({ id }) {

  const navigate = useNavigate()

  const backToCourses = () => {
    navigate('./')
  }

  return (
    <div className="modificar-curso-container">
      <div className='modificar-curso-box'>

        <div className='salir-modificar' onCanPlay={backToCourses}>X</div>
      </div>
    </div>
  )

}