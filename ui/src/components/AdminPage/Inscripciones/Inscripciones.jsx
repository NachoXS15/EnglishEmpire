import { useEffect, useState } from 'react'
import '../../../styles/AdminPage/Inscripciones/Inscripciones.css'
import { useNavigate } from 'react-router-dom'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import FormCompletoCard from './FormCompletoCard'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Inscripciones() {
  const [inscripciones, setInscripciones] = useState([])
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState([])
  const [formToShow, setFormToShow] = useState(null)
  const [cursos, setCursos] = useState([])
  const [filtroDNI, setFiltroDNI] = useState('')
  const [filtroPagado, setFiltroPagado] = useState('todos')
  const [filtroCursos, setFiltroCursos] = useState('todos')
  const [filtroMetodoPago, setFiltroMetodoPago] = useState('todos')
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  //verificar usuario registrado
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


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setIsMobile(true);
      } else {
        setIsMobile(false);

      }
    };

    window.addEventListener('resize', handleResize);

    // Limpieza del evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goBackToMenu = () => {
    navigate('../menu')
  }

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const inscripcionesCollection = collection(db, 'Inscripciones');
      const inscripcionesSnapshot = await getDocs(inscripcionesCollection);
      const inscripcionesList = inscripcionesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      let listaCursos = []
      inscripcionesList.forEach(insc => {
        if (!listaCursos.includes(insc.alumno.curso)) {
          listaCursos.push(insc.alumno.curso)
        }
      })

      setCursos(listaCursos)
      setInscripciones(inscripcionesList);
    };

    fetchData();
  }, []);

  const handleViewForm = (indice) => {
    setFormToShow(inscripciones[indice])
  }

  useEffect(() => {
    let filtradas = []
    let filtradasPorDNI = inscripciones.filter(insc => insc.alumno.dni.startsWith(filtroDNI))
    let filtradasPorPago = filtradasPorDNI
    if (filtroPagado != 'todos') {
      console.log(filtradasPorDNI)
      if (filtroPagado == 'pagado') {
        filtradasPorPago = filtradasPorDNI.filter(insc => insc.pagado == true)
      } else {
        filtradasPorPago = filtradasPorDNI.filter(insc => insc.pagado == false)
      }
    }
    let filtradaPorCursos = filtradasPorPago
    if (filtroCursos != 'todos') {
      filtradaPorCursos = filtradasPorPago.filter(insc => insc.alumno.curso == filtroCursos)
    }

    let filtradasPorMetodo = [...filtradaPorCursos]
    if (filtroMetodoPago != 'todos') {
      filtradasPorMetodo = filtradasPorPago.filter(insc => insc.metodoPago == filtroMetodoPago)
    }

    filtradas = [...filtradasPorMetodo]

    setInscripcionesFiltradas(filtradas)

  }, [filtroMetodoPago, filtroDNI, filtroCursos, filtroPagado, inscripciones])

  const handleFiltroChange = (e) => {
    if (e.target.id == 'filtroDNI') {
      setFiltroDNI(e.target.value)
    }
    else if (e.target.id == 'filtroPagado') {
      setFiltroPagado(e.target.value)
    } else if (e.target.id == 'filtroCurso') {
      setFiltroCursos(e.target.value)
    } else if (e.target.id == 'filtroMetodoPago') {
      setFiltroMetodoPago(e.target.value)
    }

  }


  // Descargar tabla de inscripciones como CSV
  const inscripcionesToCSV = (inscripciones) => {
    const csvRows = [];
    const headers = [
      "ID", "Nombre", "Apellido", "DNI", "Fecha de Nacimiento", "Email",
      "Teléfono", "Curso", "Tutor", "Método de Pago", "Pagado", "Horario Subida", "Fecha Creación"
    ];
    csvRows.push(headers.join(",")); // Agregar encabezados

    inscripciones.forEach(inscripcion => {
      const { id, pagado, metodoPago, horarioSubida, createdAt, alumno } = inscripcion;
      const fechaCreacion = createdAt ? new Date(createdAt.seconds * 1000).toLocaleString() : "N/A";

      const row = [
        id,
        alumno?.nombre || "N/A",
        alumno?.apellido || "N/A",
        alumno?.dni || "N/A",
        alumno?.fechaNacimiento || "N/A",
        alumno?.email || "N/A",
        alumno?.telefono || "N/A",
        alumno?.curso || "N/A",
        alumno?.tutor || "N/A",
        metodoPago || "N/A",
        pagado ? "Sí" : "No",
        horarioSubida || "N/A",
        fechaCreacion
      ];

      csvRows.push(row.map(value => `"${value}"`).join(",")); // Formatear cada celda con comillas
    });

    return csvRows.join("\n");
  };

  // Función para descargar el CSV
  const downloadCSV = (data) => {
    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inscripciones.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const descargarCSVButton = () => {
    const csvData = inscripcionesToCSV(inscripciones);
    downloadCSV(csvData);
  }

  return (
    <div className='inscripciones--container'>
      <div className='inscripciones-header'>
        <div className='back-to-menu-btn' onClick={goBackToMenu}>
          <i className="fa-solid fa-circle-left"></i>
        </div>
        <h2>Inscripciones</h2>
      </div>
      <div className='inscripciones--filtro-container'>
        <div>
          <label htmlFor="filtroDNI">DNI </label>
          <input type="number" placeholder='Buscar por DNI...' value={filtroDNI} name="filtroDNI" id='filtroDNI' onChange={handleFiltroChange} />
        </div>
        <div>
          <label htmlFor="filtroPagado">Pagado</label>
          <select name="filtroPagado" id="filtroPagado" className='pagado-select' onChange={handleFiltroChange}>
            <option value="todos">Todos</option>
            <option value="pagado">Pagado</option>
            <option value="nopagado">No pagado</option>
          </select>
        </div>
        <div>
          <label htmlFor="filtroCurso">Curso</label>
          <select name="filtroCurso" id="filtroCurso" onChange={handleFiltroChange}>
            <option value="todos">Todos</option>
            {
              cursos.map(curso => (
                <option value={curso} key={curso}>{curso}</option>
              ))
            }
          </select>

        </div>
        <div>
          <label htmlFor="filtroMetodoPago">Metodo de Pago</label>
          <select name="filtroMetodoPago" id="filtroMetodoPago" onChange={handleFiltroChange}>
            <option value="todos">Todos</option>
            <option value="Mercado Pago">Mercado Pago</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>
      </div>
      <div className='inscripciones--table-container'>
        {/* 
          ¿Que mostramos en la tabla de inscripción? 
          -Nombre Alumno y DNI
          -Curso Inscripto
          -Boton ver comprobante
          -Metodo de pago
        */}
        {
          inscripciones.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>DNI</th>
                {
                  !isMobile &&
                  <>
                    <th>Curso</th>
                    <th>Metodo de pago</th>
                  </>
                }

                <th>Formulario</th>
                <th>Pagado</th>
              </tr>
            </thead>
            <tbody>
              {
                inscripcionesFiltradas.length > 0 ?
                  inscripcionesFiltradas.map((inscripcion, index) => (
                    <tr key={index} >
                      <td>{inscripcion.alumno.nombre} {inscripcion.alumno.apellido}</td>
                      <td>{inscripcion.alumno.dni}</td>
                      {
                        !isMobile &&
                        <>
                          <td>{inscripcion.alumno.curso}</td>
                          <td>{inscripcion.metodoPago}</td>
                        </>
                      }
                      <td>
                        <button className='inscripcion-completa-btn' onClick={() => { handleViewForm(index) }}>Formulario</button>
                      </td>
                      <td>
                        {inscripcion.pagado ? <p>Si</p> : <p>No</p>}
                      </td>
                    </tr>)) : ''
              }
            </tbody>
          </table>
        }
        {
          inscripciones.length < 1
            ? <p>Aun no hay inscripciones.</p>
            : <button className='descargar-inscripciones-btn' onClick={descargarCSVButton}>Descargar todas las inscripciones</button>
        }

      </div>

      {
        formToShow != null && <FormCompletoCard form={formToShow} setForm={setFormToShow} />
      }

    </div >
  )
}