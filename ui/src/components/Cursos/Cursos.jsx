import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import '../../styles/Cursos.css'
import { useState, useEffect } from 'react'
import { CourseCard } from './CourseCard.jsx'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

export default function Cursos() {
  const db = getFirestore()

  const [cursos, setCursos] = useState([])
  const [categorySelected, setCategorySelected] = useState('Kinders')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collection(db, 'Categorias'));
        const cat = response.docs[0].data().categorias
        setCategories(cat)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      try {
        const response = await getDocs(collection(db, 'Cursos'));
        const dataCursos = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const ordenarPorLetra = (a, b) => {
          const letraA = a.nombre.match(/"([^"]+)"/)[1];
          const letraB = b.nombre.match(/"([^"]+)"/)[1];
          return letraA.localeCompare(letraB);
        }
        let cursosOrdenados = dataCursos.sort(ordenarPorLetra)
        setCursos(cursosOrdenados);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }

    };

    fetchData();

  }, [])

  const selectCategory = (e) => {
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
                onClick={selectCategory}
              >{category}
              </button>
            ))}
          </div>
          <div className='cursos-cards-container'>
            {
              cursos.filter(curso => curso.categoria === categorySelected).map(curso => (
                <CourseCard
                  key={curso.id}
                  curso={curso}
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