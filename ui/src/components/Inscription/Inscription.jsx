import '../../styles/Inscription.css'
import Header from '../Header'
import Footer from '../Footer'
import { MainBanner } from '../MainBanner'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection, serverTimestamp, addDoc, updateDoc, doc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

export default function Inscription() {
	const [tutorSi, setTutorSi] = useState(false)
	const [cursos, setCursos] = useState([])
	const [file, setFile] = useState(null);
	const [linkDePago, setLinkDePago] = useState('')
	const [metodoPago, setMetodoPago] = useState('')
	const [datosTransferenciaModal, setDatosTransferenciaModal] = useState(false)
	const [formAlumno, setFormAlumno] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		nacimiento: '',
		email: '',
		telefono: '',
		curso: '',
		tutor: false
	})
	const [formTutor, setFormTutor] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		nacimiento: '',
		email: '',
		telefono: '',
		parentesco: '',
		alternativo: ''
	})

	const { id } = useParams()
	const db = getFirestore()
	const navigate = useNavigate()

	const handleInputAlumnoChange = (e) => {
		setFormAlumno({
			...formAlumno,
			[e.target.id]: e.target.value
		})

		if (e.target.id == 'curso') {
			setLinkDePago(e.target.selectedOptions[0].id)
		}
	}

	const handleInputTutorChange = (e) => {
		setFormTutor({
			...formTutor,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {
		setFormAlumno({
			...formAlumno,
			tutor: tutorSi
		})
	}, [tutorSi])

	// fetching data
	useEffect(() => {
		const fetchData = async () => {
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
				setCursos(cursosOrdenados)
			} catch (error) {
				console.error('Error fetching data: ', error);
			}

		};

		fetchData()
	}, [])

	const verificarForm = (e) => {
		e.preventDefault()


		// Verificaciones
		if (formAlumno.telefono.length < 10) {
			alert('Ingrese numero valido')
			return
		}
		if (formAlumno.curso == '' || formAlumno.curso == 'x') {
			alert('Seleccione un curso')
			return
		}

		if (formAlumno.tutor) {
			if (formTutor.telefono.length < 10) {
				alert('Ingrese numero valido')
				return
			}
			if (formTutor.parentesco == '') {
				alert('Seleccione parentesco')
				return
			}
		}

		goToMetodoPagoButton()

	}

	const goToMetodoPagoButton = (e) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
		document.querySelector('.confirmacion').classList.add('disabled')
		document.querySelector('.form-container').classList.add('disabled')
		document.querySelector('.metodo-de-pago').classList.remove('disabled')
	}

	const goBackToForm = (e) => {
		e.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
		document.querySelector('.form-container').classList.remove('disabled')
		document.querySelector('.metodo-de-pago').classList.add('disabled')
	}

	const goToConfirmacion = () => {
		if (metodoPago == '') {
			alert('Seleccione Metodo de Pago')
			return
		}
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
		document.querySelector('.metodo-de-pago').classList.add('disabled')
		document.querySelector('.confirmacion').classList.remove('disabled')

	}

	const handleMetodoPagoChange = (e) => {
		if (e.target.id == 'mercado-pago') {
			setMetodoPago('Mercado Pago')
		} else if (e.target.id == 'transferencia') {
			setMetodoPago('Transferencia')
		} else {
			setMetodoPago('Efectivo')
		}

	}

	const submitForm = async () => {
		let formData
		if (tutorSi) {
			formData = {
				alumno: {
					nombre: formAlumno.nombre,
					apellido: formAlumno.apellido,
					fechaNacimiento: formAlumno.nacimiento,
					dni: formAlumno.dni,
					email: formAlumno.email,
					telefono: formAlumno.telefono,
					curso: formAlumno.curso,
					tutor: 'Si'
				},
				tutor: {
					nombre: formTutor.nombre,
					apellido: formTutor.apellido,
					fechaNacimiento: formTutor.nacimiento,
					dni: formTutor.dni,
					email: formTutor.email,
					telefono: formTutor.telefono,
					parentesco: formTutor.parentesco,
				},
				metodoPago: metodoPago,
			}
		} else {
			formData = {
				alumno: {
					nombre: formAlumno.nombre,
					apellido: formAlumno.apellido,
					fechaNacimiento: formAlumno.nacimiento,
					dni: formAlumno.dni,
					email: formAlumno.email,
					telefono: formAlumno.telefono,
					curso: formAlumno.curso,
					tutor: 'No'
				},
				metodoPago: metodoPago,
			}
		}

		let cursoElegido = cursos.filter(curso => curso.nombre == formAlumno.curso)
		// Descontar Cupo de curso

		let comprobanteURL
		if (metodoPago == 'Transferencia') {
			comprobanteURL = await uploadComprobante(file)
		} else {
			comprobanteURL = false
		}

		const now = new Date();
		const dia = now.getDate().toString().padStart(2, '0'); // Día con dos dígitos
		const mes = (now.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (getMonth es 0-indexado)
		const año = now.getFullYear(); // Año con cuatro dígitos
		const hora = now.getHours().toString().padStart(2, '0'); // Hora con dos dígitos
		const minutos = now.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos

		// Formato "DD/MM/YYYY - HH:MM"
		const horarioSubida = `${dia}/${mes}/${año} - ${hora}:${minutos}`;

		// Agregar timestamp al formData
		const formDataWithTimestamp = {
			...formData,
			comprobante: comprobanteURL,
			pagado: false,
			horarioSubida,
			createdAt: serverTimestamp() // Marca de tiempo del servidor
		};

		// seleccionar el curso elegido para restarle un cupo
		let cuposRestantes = cursoElegido[0].cupos - 1
		const docRef = doc(db, 'Cursos', cursoElegido[0].id);

		try {
			await updateDoc(docRef, {
				cupos: cuposRestantes
			});
			await addDoc(collection(db, 'Inscripciones'), formDataWithTimestamp);
			alert('Inscripcion exitosa! Nos estaremos comunicando con usted a la brevedad!')
			navigate('../')
		} catch (error) {
			console.error('Error al actualizar el campo:', error);
		}

	}

	// Funciones para subir comprobante de pago
	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];

		if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/'))) {
			setFile(selectedFile); // Solo acepta PDFs o imágenes
		} else {
			alert('Formato de archivo no válido. Solo se aceptan PDFs e imágenes.');
			// Puedes agregar lógica para notificar al usuario sobre el error
		}
	};


	const uploadComprobante = (archivo) => {
		return new Promise((resolve, reject) => {
			if (!archivo) {
				alert('Subir comprobante por favor')
				reject('No se seleccionó ningún archivo');
				return;
			}

			const storage = getStorage();
			const storageRef = ref(storage, `comprobantes/${archivo.name}`);
			const uploadTask = uploadBytesResumable(storageRef, archivo);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Puedes manejar el progreso de la carga aquí si lo deseas
				},
				(error) => {
					reject('Error subiendo el archivo:', error);
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						resolve(downloadURL); // Devuelve la URL del comprobante
					} catch (error) {
						reject('Error obteniendo la URL del archivo:', error);
					}
				}
			);


		});
	};



	return (
		<>
			<Header></Header>
			<section className='inscription-container'>
				<MainBanner>Inscripcion</MainBanner>
				<div className='form-container'>
					<form action="#" onSubmit={verificarForm}>
						<div className='form-element'>
							<label htmlFor="nombre">
								Nombre
								<span>*</span>
							</label>

							<input type="text" id='nombre' value={formAlumno.nombre} required onChange={handleInputAlumnoChange} />
						</div>
						<div className='form-element'>
							<label htmlFor="apellido">
								Apellido
								<span>*</span>
							</label>
							<input type="text" id='apellido' value={formAlumno.apellido} required onChange={handleInputAlumnoChange} />
						</div>
						<div className='form-element'>
							<label htmlFor="dni">
								DNI
								<span>*</span>
							</label>
							<input type="number" id='dni' value={formAlumno.dni} required onChange={handleInputAlumnoChange} />
						</div>
						<div className='form-element'>
							<label htmlFor="date">
								Fecha de nacimiento
								<span>*</span>
							</label>
							<input type="date" id='nacimiento' value={formAlumno.nacimiento} required onChange={handleInputAlumnoChange} />
						</div>
						<div className='form-element'>
							<label htmlFor="correo">
								Email
								<span>*</span>
							</label>
							<input type="email" id='email' value={formAlumno.email} required onChange={handleInputAlumnoChange} />
						</div>
						<div className='form-element'>
							<label htmlFor="telefono">
								Teléfono
								<span>*</span>
							</label>
							<input type="number" id='telefono' value={formAlumno.telefono} required onChange={handleInputAlumnoChange} />
						</div>
						<div className='form-element'>
							<label htmlFor="curso">
								Curso
								<span>*</span>
							</label>

							<select className='select-element' name="curso" id="curso" defaultValue={id} required onChange={handleInputAlumnoChange}>
								<option value="x">Seleccionar...</option>
								{cursos.filter(curso => curso.cupos > 0).map(curso => (
									<option key={curso.id} value={curso.nombre} id={curso.linkPago}>{curso.nombre}</option>
								))}
							</select>
						</div>
						<div className='form-element'>
							<label htmlFor="tutor">
								Con tutor/a
								<span>*</span>
								<p>Si eres menor de edad, debes agregar los datos de tu tutor/a.</p>
								<div className='radio-div'>
									<div>
										<input type="radio" name='tutor' id='tutorSi' required value='Si' onClick={() => setTutorSi(true)} />
										<label htmlFor="tutorSi">Si</label>
									</div>
									<div>
										<input type="radio" name='tutor' id='tutorNo' required value='No' onClick={() => setTutorSi(false)} />
										<label htmlFor="tutorNo">No</label>
									</div>
								</div>
							</label>


						</div>

						{/* Tutor */}
						{
							tutorSi &&
							<>
								<div className='form-element tutor-element'>
									<label htmlFor="nombre-tutor">
										Nombre
										<span>*</span>
									</label>

									<input type="text" id='nombre-tutor' name='nombre' onChange={handleInputTutorChange} required={tutorSi} />
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="apellido-tutor">
										Apellido
										<span>*</span>
									</label>
									<input type="text" id='apellido-tutor' name='apellido' onChange={handleInputTutorChange} required={tutorSi} />
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="dni-tutor">
										DNI
										<span>*</span>
									</label>
									<input type="number" id='dni-tutor' name='dni' onChange={handleInputTutorChange} required={tutorSi} />
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="date-tutor">
										Fecha de nacimiento
										<span>*</span>
									</label>
									<input type="date" id='date-tutor' name='nacimiento' onChange={handleInputTutorChange} required={tutorSi} />
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="correo-tutor">
										Email
										<span>*</span>
									</label>
									<input type="email" id='correo-tutor' name='email' onChange={handleInputTutorChange} required={tutorSi} />
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="telefono-tutor">
										Teléfono
										<span>*</span>
									</label>
									<input type="number" id='telefono-tutor' name='telefono' onChange={handleInputTutorChange} required={tutorSi} />
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="curso">
										Parentesco
										<span>*</span>
									</label>
									<select className='select-element' name="parentesco" id="parentesco" onChange={handleInputTutorChange}>
										<option value="">Seleccionar...</option>
										<option value="Madre">Madre</option>
										<option value="Padre">Padre</option>
										<option value="Tutor">Tutor</option>
									</select>
								</div>
								<div className='form-element tutor-element'>
									<label htmlFor="alternativo">
										Contacto Alternativo
									</label>
									<input type="text" id='alternativo' name='alternativo' onChange={handleInputTutorChange} />
								</div>
							</>
						}
						<div className='form-element button'>
							<button>Siguiente</button>
						</div>
					</form>

				</div>

				{/* ------METODO DE PAGO------ */}

				<div className='metodo-de-pago disabled'>
					<h2>Método de pago:</h2>
					<div className='metodos-list'>
						<div>
							<input type="radio" name='metodoPago' id='mercado-pago' onChange={handleMetodoPagoChange} />
							<label htmlFor="mercado-pago">Mercado Pago</label>
						</div>
						<div>
							<input type="radio" name='metodoPago' id='transferencia' onChange={handleMetodoPagoChange} />
							<label htmlFor="transferencia">Transferencia</label>
						</div>
						<div>
							<input type="radio" name='metodoPago' id='efectivo' onChange={handleMetodoPagoChange} />
							<label htmlFor="efectivo">Efectivo</label>
						</div>
					</div>
					<div className='pago--buttons-container button'>
						<button onClick={goBackToForm}>Volver</button>
						<button onClick={goToConfirmacion}>Siguiente</button>
					</div>

				</div>

				{/* ------CONFIRMACION------ */}

				<div className='confirmacion disabled'>
					<h2>Confirmación</h2>
					<p>Por favor revisa que los datos estén correctos antes de enviar la inscripción.</p>
					<div className='datos'>
						<div className='datos-first-container'>
							<div className='datos-alumno'>
								<h3>Datos del alumno:</h3>
								<p><b>Nombre: </b>{formAlumno.nombre}</p>
								<p><b>Apellido: </b>{formAlumno.apellido}</p>
								<p><b>Fecha de nacimiento: </b>{formAlumno.nacimiento}</p>
								<p><b>DNI: </b>{formAlumno.dni}</p>
								<p><b>Email: </b>{formAlumno.email}</p>
								<p><b>Teléfono: </b>{formAlumno.telefono}</p>
								<p><b>Con tutor/a: </b>{formAlumno.tutor ? 'Si' : 'No'}</p>
							</div>
							{
								formAlumno.tutor &&
								<>
									<div className='datos-tutor'>
										<h3>Datos del tutor:</h3>
										<p><b>Nombre: </b>{formTutor.nombre}</p>
										<p><b>Apellido: </b>{formTutor.apellido}</p>
										<p><b>Fecha de nacimiento: </b>{formTutor.nacimiento}</p>
										<p><b>DNI: </b>{formTutor.dni}</p>
										<p><b>Email: </b>{formTutor.email}</p>
										<p><b>Parentesco: </b>{formTutor.parentesco}</p>
										<p><b>Teléfono: </b>{formTutor.telefono}</p>
										{
											formTutor.alternativo != '' &&
											<p><b>Contacto alternativo: </b>{formTutor.alternativo}</p>
										}
									</div>
								</>
							}

						</div>
						<div className='datos-curso-pago'>
							<h3>Datos del curso</h3>
							<p><b>Curso: </b>{formAlumno.curso}</p>
							<h3>Método de pago: </h3>
							<p><b>Pago: </b>{metodoPago}</p>
							{
								metodoPago == 'Mercado Pago' &&
								<p><b>Link de pago: </b><a href={linkDePago} target='_blank'>{linkDePago}</a></p>
							}
							{
								metodoPago == 'Transferencia' &&
								<>
									<button className='datos-transferir' onClick={() => {
										setDatosTransferenciaModal(true)
									}}>Ver datos para transferir</button>
									<p>
										<label htmlFor="comprobante"><b>Suba su comprobante de pago:</b></label>
									</p>
									<input type="file" name="comprobante" id="comprobante" accept='.pdf, .jpg, .png, .jpeg' onChange={handleFileChange} />
								</>
							}
						</div>
					</div>
					<div className='pago--buttons-container button'>
						<button onClick={goToMetodoPagoButton}>Volver</button>
						<button onClick={submitForm}>Confirmar</button>
					</div>
				</div>
				{
					datosTransferenciaModal &&
					<div className='datos-transferencia-container'>
						<div className='datos-transferencia--box'>
							<div onClick={() => { setDatosTransferenciaModal(false) }}>X</div>
							<p>Titular de la cuenta: English Empire LR</p>
							<p>Alias: nicolujan16</p>
							<p>CBU: 000124120849128410</p>
						</div>
					</div>
				}
			</section>
			<Footer></Footer>
		</>
	)
}