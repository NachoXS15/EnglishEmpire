import { useNavigate } from 'react-router-dom'
import './Consultas.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

export default function Consultas() {
  const [consultas, setConsultas] = useState([])
  const [postulaciones, setPostulaciones] = useState([])

  const navigate = useNavigate()
  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
      } else {
        navigate('../administracion')
      }
    });

    return () => unsubscribe();
  }, [auth, navigate])

  const goBackToMenu = () => {
    navigate('../menu')
  }

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore()
      const consultas = collection(db, 'Consultas');
      const consultasSnapshots = await getDocs(consultas);
      const consultasList = consultasSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const postulaciones = collection(db, 'Postulantes');
      const postulantesSnap = await getDocs(postulaciones);
      const postulantesList = postulantesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPostulaciones(postulantesList)
      setConsultas(consultasList)
    };

    fetchData();
  }, []);


  useEffect(() => {
    console.log(consultas)
    console.log(postulaciones)
  }, [postulaciones, consultas])


  return (
    <div className="consultas--container">
      <div className='consultas--header'>
        <div className='back-to-menu-btn' onClick={goBackToMenu}>
          <i className="fa-solid fa-circle-left"></i>
        </div>
        <h2>Consultas</h2>
      </div>
      <div className='consultas--main'>
        <div>
          <h3>Consultas</h3>
          {
            consultas.length > 0 ?
              consultas.map(cons => (
                <div className='consulta--box' key={cons.id}>
                  <i>{cons.nombre} {cons.apellido}</i>
                  <p>{cons.consulta}</p>
                  <p>{cons.email}</p>
                  <a href={`https://wa.me/${cons.telefono}`} target='_blank'>{cons.telefono}</a>
                </div>
              )) :
              <p>Aun no hay consultas.</p>
          }
        </div>
        <div>
          <h3>Postulaciones</h3>
          {
            postulaciones.length > 0 ?
              postulaciones.map(pos => (
                <div className='consulta--box' key={pos.id}>
                  <p>{pos.nombre} {pos.apellido} - {pos.nacimiento}</p>
                  <p>{pos.descripcion}</p>
                  <p>{pos.email}</p>
                  <a href={`https://wa.me/${pos.telefono}`} target='_blank'>{pos.telefono}</a>
                  <a href={pos.cv} target='_blank'>Ver CV</a>

                </div>
              )) :
              <p>Aun no hay postulaciones.</p>
          }
        </div>
      </div>
    </div>
  )
}