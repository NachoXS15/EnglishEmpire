import { Link, useParams } from 'react-router-dom'
import '../../styles/CursoDetails.css'
import { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import weekIcon from '../../assets/cursoDetails/icon_semanas.png'
import lessonsIcon from '../../assets/cursoDetails/icon_frecuencia.png'
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore'

export default function CursoDetails() {
  const params = useParams()
  const [curso, setCurso] = useState({})

  const db = getFirestore()

  useEffect(() => {
    const getCursoByName = async (nombre, nivel) => {
      try {
        const cursosRef = collection(db, "Cursos");
        const q = query(cursosRef, where("categoria", "==", `${nivel}`));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const cursos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          cursos.forEach(curso => {
            if (curso.nombre.replace(/\s+/g, "") == nombre) {
              let desc = curso.descripcion.split('\n\n')
              setCurso({
                ...curso,
                descripcion: desc
              })

            }
          })
        } else {
          console.log("No matching documents!");
          return null;
        }
      } catch (error) {
        console.error("Error getting documents:", error);
        throw new Error("Error getting documents");
      }
    };
    getCursoByName(params.nombre, params.nivel)
  }, [])

  return (
    <>
      <Header></Header>
      <section className='cursoDetails-container'>
        <div className='curso-banner'>
          <p>{curso.nombre}</p>
        </div>
        <div className='curso-description'>
          <div className='text-description'>
            {
              curso.descripcion ?
                curso.descripcion.map(parrafo => (
                  <p className='parrafo-description' key={parrafo}>{parrafo}</p>
                )) : ''
            }
          </div>
          <div className='price-description'>
            <div className='price-description--card'>
              <h2>${curso.precio}</h2>
              {
                curso.cupos > 0 ?
                  <Link to={`/inscripcion/${params.nombre}`} className='inscription-btn'>Inscribirme</Link>
                  :
                  <Link to={'.'} className='inscription-btn-disabled' disabled>Inscribirme</Link>
              }
              {
                curso.cupos > 0 ?
                  <i>Cupos disponibles: {curso.cupos}</i> :
                  <i>No hay más cupos disponibles</i>
              }
              <div className="card--duration">
                <p>
                  <img src={weekIcon} alt="" />
                  {curso.duracion}
                </p>
                <p>
                  <img src={lessonsIcon} alt="" />
                  {curso.clasesSemanales} clases semanales
                </p>
              </div>
              <div className='card--inicio-final'>
                <div>
                  <p className='card--red-text'>Fecha de inicio</p>
                  <p>{curso.inicio}</p>
                </div>
                <div>
                  <p className='card--red-text'>Fecha de inicio</p>
                  <p>{curso.fin}</p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>
      <Footer></Footer>
    </>
  )
}