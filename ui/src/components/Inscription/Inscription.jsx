import '../../styles/Inscription.css'
import Header from '../Header'
import Footer from '../Footer'
import { MainBanner } from '../MainBanner'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Inscription() {

	const { id } = useParams()

	const listOfCourses = [
		{
			name: 'Kinder "A"',
			id: 1
		},
		{
			name: 'Kinder "B"',
			id: 2
		},
		{
			name: 'Kinder "C"',
			id: 3
		}
	]

	const [tutorSi, setTutorSi] = useState(false)

	useEffect(() => {
		let tutorElements = document.querySelectorAll('.tutor-element')
		if (tutorSi) {
			tutorElements.forEach(element => {
				element.classList.remove('disabled')
			})
		} else {
			tutorElements.forEach(element => {
				element.classList.add('disabled')
			})
		}
	}, [tutorSi])

	const goToMetodoPagoButton = (e) => {
		e.preventDefault()
		console.log(e)
		document.querySelector('.form-container').classList.add('disabled')
		document.querySelector('.metodo-de-pago').classList.remove('disabled')
	}

	const goBackToForm = (e) => {
		e.preventDefault()
		document.querySelector('.form-container').classList.remove('disabled')
		document.querySelector('.metodo-de-pago').classList.add('disabled')
	}

	const goToConfirmacion = (e) => {
		e.preventDefault()
		document.querySelector('.metodo-de-pago').classList.add('disabled')
		document.querySelector('.confirmacion').classList.remove('disabled')

	}

	return (
		<>
			<Header></Header>
			<section className='inscription-container'>
				<MainBanner>Inscripcion</MainBanner>
				<div className='form-container'>
					<form action="#">
						<div className='form-element'>
							<label htmlFor="nombre">
								Nombre
								<span>*</span>
							</label>

							<input type="text" id='nombre' required />
						</div>
						<div className='form-element'>
							<label htmlFor="apellido">
								Apellido
								<span>*</span>
							</label>
							<input type="text" id='apellido' />
						</div>
						<div className='form-element'>
							<label htmlFor="dni">
								DNI
								<span>*</span>
							</label>
							<input type="number" id='dni' />
						</div>
						<div className='form-element'>
							<label htmlFor="date">
								Fecha de nacimiento
								<span>*</span>
							</label>
							<input type="date" id='date' />
						</div>
						<div className='form-element'>
							<label htmlFor="correo">
								Email
								<span>*</span>
							</label>
							<input type="email" id='correo' />
						</div>
						<div className='form-element'>
							<label htmlFor="telefono">
								Teléfono
								<span>*</span>
							</label>
							<input type="number" id='telefono' />
						</div>
						<div className='form-element'>
							<label htmlFor="curso">
								Curso
								<span>*</span>
							</label>

							<select className='select-element' name="curso" id="curso" defaultValue={id}>
								<option value="x">Seleccionar...</option>
								{listOfCourses.map(course => (
									<option key={course.id} value={course.id}>{course.name}</option>
								))}
							</select>
						</div>
						<div className='form-element'>
							<label htmlFor="tutor">
								Con tutor/a
								<span>*</span>
								<p>Si sos menor de edad, debes agregar los datos de tu tutor/a.</p>
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
						<div className='form-element tutor-element disabled'>
							<label htmlFor="nombre-tutor">
								Nombre
								<span>*</span>
							</label>

							<input type="text" id='nombre-tutor' />
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="apellido-tutor">
								Apellido
								<span>*</span>
							</label>
							<input type="text" id='apellido-tutor' />
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="dni-tutor">
								DNI
								<span>*</span>
							</label>
							<input type="number" id='dni-tutor' />
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="date-tutor">
								Fecha de nacimiento
								<span>*</span>
							</label>
							<input type="date" id='date-tutor' />
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="correo-tutor">
								Email
								<span>*</span>
							</label>
							<input type="email" id='correo-tutor' />
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="telefono-tutor">
								Teléfono
								<span>*</span>
							</label>
							<input type="number" id='telefono-tutor' />
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="curso">
								Parentesco
								<span>*</span>
							</label>
							<select className='select-element' name="parentesto" id="parentesco">
								<option value="x">Seleccionar...</option>
								<option value="madre">Madre</option>
								<option value="madre">Padre</option>
								<option value="madre">Tutor</option>
							</select>
						</div>
						<div className='form-element tutor-element disabled'>
							<label htmlFor="alternativo">
								Contacto Alternativo
							</label>
							<input type="text" id='alternativo' />
						</div>

						<div className='form-element button'>
							<button onClick={goToMetodoPagoButton}>Siguiente</button>
						</div>



					</form>

				</div>

				{/* ------METODO DE PAGO------ */}

				<div className='metodo-de-pago disabled'>
					<h2>Método de pago:</h2>
					<div className='metodos-list'>
						<div>
							<input type="radio" name='metodo-de-pago' id='mercado-pago' />
							<label htmlFor="mercado-pago">Mercado Pago</label>
						</div>
						<div>
							<input type="radio" name='metodo-de-pago' id='transferencia' />
							<label htmlFor="transferencia">Transferencia</label>
						</div>
						<div>
							<input type="radio" name='metodo-de-pago' id='efectivo' />
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
								<p><b>Nombre: </b></p>
								<p><b>Apellido: </b></p>
								<p><b>Fecha de nacimiento: </b></p>
								<p><b>DNI: </b></p>
								<p><b>Email: </b></p>
								<p><b>Teléfono: </b></p>
								<p><b>Con tutor/a: </b></p>
							</div>
							<div className='datos-tutor'>
								<h3>Datos del tutor:</h3>
								<p><b>Nombre: </b></p>
								<p><b>Apellido: </b></p>
								<p><b>Fecha de nacimiento: </b></p>
								<p><b>DNI: </b></p>
								<p><b>Email: </b></p>
								<p><b>Parentesco: </b></p>
								<p><b>Teléfono: </b></p>
								<p><b>Contacto alternativo: </b></p>
							</div>
						</div>
						<div className='datos-curso-pago'>
							<h3>Datos del curso</h3>
							<p><b>Curso: </b>Juniors</p>
							<h3>Método de pago: </h3>
							<p><b>Pago: </b></p>
						</div>
					</div>
					<div className='pago--buttons-container button'>
						<button>Volver</button>
						<button>Confirmar</button>
					</div>
				</div>
			</section>
			<Footer></Footer>
		</>
	)
}