import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { MainBanner } from '../MainBanner.jsx'
import '../../styles/Cursos.css'
import { useState, useEffect } from 'react'
import { CourseCard } from './CourseCard.jsx'
import { collection, getDocs, getFirestore } from 'firebase/firestore'



const cursosPersonalizados = [
  {
    id: "1",
    edades: "Todas las edades!",
    descripcion: '¡Bienvenidos a nuestras clases de inglés para niños de 4 y 5 años! En estas clases, los niños aprenderán de manera divertida y lúdica los conceptos básicos de la lengua inglesa.\n\nUtilizamos juegos, canciones y actividades interactivas para que los niños se diviertan mientras aprenden. Además, nuestros profesores están altamente capacitados en enseñar a niños pequeños y utilizan técnicas pedagógicas que estimulan su creatividad y curiosidad.\n\nEntre las habilidades que los niños desarrollarán en estas clases se encuentran: comprensión auditiva, pronunciación, vocabulario básico, gramática simple y la capacidad de comunicarse en situaciones cotidianas.',
    categoria: "Individuales",
    nombre: "Clases Individuales"
  },
  {
    id: "2",
    edades: "Todas las edades!",
    categoria: "Empresariales",
    nombre: "Clases empresariales"
  }

]

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
        setCategories([...cat, 'Individuales', 'Empresariales'])
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      try {
        const response = await getDocs(collection(db, 'Cursos'));
        const dataCursos = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCursos([...dataCursos, ...cursosPersonalizados]);
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
              cursos.length > 0 ? cursos.filter(curso => curso.categoria === categorySelected).map(curso => (
                <CourseCard
                  key={curso.id}
                  curso={curso}
                />
              )) : <p>Cargando Cursos...</p>
            }
          </div>
        </div>

      </section>
      <Footer></Footer>
    </>
  )
}