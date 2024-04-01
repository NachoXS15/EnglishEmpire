import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import '../../styles/Cursos.css'
import { useState } from 'react'
import { CourseCard } from './CourseCard.jsx'

export default function Cursos() {
  const cursosJSON = [
    {
      name: 'Kinder "A"',
      ages: '3, 4 y 5',
      img: 'https://www.englishempire.com.ar/assets/courses/kinder/__Mobile_kinder.png',
      category: 'Kinder',
      url: '/kinder/1'
    },
    {
      name: 'Juniors "A"',
      ages: '6 y 7',
      img: 'https://www.englishempire.com.ar/assets/courses/juniors/__Mobile_beginners04.png',
      category: 'Juniors',
      url: '/juniors/1'
    },
    {
      name: 'Juniors "B"',
      ages: '8, 9 y 10',
      img: 'https://www.englishempire.com.ar/assets/courses/juniors/__Mobile_beginners03.png',
      category: 'Juniors',
      url: '/juniors/2'
    },
    {
      name: 'Juniors "C"',
      ages: '11, 12 y 13',
      img: 'https://www.englishempire.com.ar/assets/courses/juniors/__Mobile_beginners02.png',
      category: 'Juniors',
      url: '/juniors/3'
    },
    {
      name: 'Teens',
      ages: '14, 15 y 16',
      img: 'https://www.englishempire.com.ar/assets/courses/teens/__Mobile_teens01.png',
      category: 'Teens',
      url: '/teens/1'
    },
    {
      name: 'Adults Principiantes (virtual)',
      ages: ['+17'],
      img: 'https://www.englishempire.com.ar/assets/courses/kinder/__Mobile_kinder.png',
      category: 'Adults',
      url: '/adults/1'
    }
  ]

  const [cursos, setCursos] = useState(cursosJSON)
  const [categorySelected, setCategorySelected] = useState('Kinder')
  const categories = ['Kinder', 'Juniors', 'Teens', 'Adults', 'Individuales', 'Empresariales']

  const selectCurso = (e) => {
    setCategorySelected(e.target.innerText)
  }

  return (
    <>
      <Header></Header>
      <section className='cursos--main-container'>
        <MainBanner>Cursos</MainBanner>
        <div className='cursos-main'>
          <div className='cursos-buttons'>
            {categories.map(category => (
              <button
                key={category}
                className={category == categorySelected ? 'curso-selected' : ''}
                onClick={selectCurso}
              >{category}
              </button>
            ))}
          </div>
          <div className='cursos-cards-container'>
            {
              cursos.filter(curso => curso.category === categorySelected).map(curso => (
                <CourseCard
                  key={curso.name}
                  imgUrl={curso.img}
                  cursoName={curso.name}
                  cursoAge={curso.ages}
                  url={curso.url}

                />
              ))
            }
          </div>
        </div>

      </section>
      <Footer></Footer>
    </>
  )
}