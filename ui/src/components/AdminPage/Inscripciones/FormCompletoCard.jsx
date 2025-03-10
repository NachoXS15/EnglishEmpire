import { useState } from 'react'
import '../../../styles/AdminPage/Inscripciones/FormCompletoCard.css'
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function FormCompletoCard({ form, setForm }) {

  const [confirmarPagadoModal, setConfirmarPagadoModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const db = getFirestore()

  const handleExitForm = () => {
    setForm(null)
  }

  const handlePagadoModalButton = () => {
    setConfirmarPagadoModal(!confirmarPagadoModal)
  }

  const changePagadoSubmit = async () => {
    const docRef = doc(db, 'Inscripciones', form.id);
    try {
      await updateDoc(docRef, {
        pagado: !form.pagado
      });
      Swal.fire({
        text: "Curso actualizado correctamente",
        icon: "success"
      }).then(() => {
        setConfirmarPagadoModal(false)
        setForm(null)
        window.location.reload()
      })
    } catch (error) {
      console.log('Error al actualizar el campo:', error);
    }

  }

  const handleDeleteButton = () => {
    setDeleteModal(!deleteModal)
  }

  const deleteInsc = async () => {
    try {
      Swal.fire({
        title: "Eliminando...",
        text: "Por favor espera.",
        icon: "info",
        showConfirmButton: false,  // No mostrar botón
        allowOutsideClick: false,  // Evitar que se cierre fuera del cuadro
        didOpen: () => {
          Swal.showLoading();  // Muestra el spinner
        }
      });
      const docRef = doc(db, "Inscripciones", form.id);
      await deleteDoc(docRef)
      Swal.close();
      Swal.fire({
        text: "Documento eliminado exitosamente",
        icon: "success"
      }).then(() => {
        window.location.reload()
      })
    } catch {
      Swal.fire({
        text: "Error eliminando documento, intente nuevamente",
        icon: "error"
      })
    }

  }

  return (
    <div className='form-completo--container'>
      <div className='form-completo--box'>
        <div>

          <button className='exit-form-btn' onClick={handleExitForm}>X</button>
          <h3>Datos de Alumno:</h3>
          <div className='datos-alumno'>
            <p>Nombre: <b>{form.alumno.nombre}</b></p>
            <p>Apellido: <b>{form.alumno.apellido}</b></p>
            <p>DNI: <b>{form.alumno.dni}</b></p>
            <p>Email: <b>{form.alumno.email}</b></p>
            <p>Telefono: <b>{form.alumno.telefono}</b></p>
            <p>Nacimiento: <b>{form.alumno.fechaNacimiento}</b></p>
            <p>Tutor: {form.alumno.tutor}</p>
          </div>
          {
            form.alumno.tutor == 'Si' &&
            <>
              <h3>Datos del {form.tutor.parentesco}:</h3>
              <div className='datos-tutor'>
                <p>Nombre: <b>{form.alumno.tutor ? form.tutor.nombre : ''}</b></p>
                <p>Apellido: <b>{form.tutor.apellido}</b></p>
                <p>DNI: <b>{form.tutor.dni}</b></p>
                <p>Email: <b>{form.tutor.email}</b></p>
                <p>Telefono: <b>{form.tutor.telefono}</b></p>
                <p>Nacimiento: <b>{form.tutor.fechaNacimiento}</b></p>
              </div>
            </>
          }

          <div className='metodo-pago--info'>
            <p>Metodo de pago: {form.metodoPago}</p>
            <p>Inscripto el {form.horarioSubida}</p>
          </div>
          {
            form.metodoPago == 'Transferencia' &&
            <a href={form.comprobante} target='_blank'>Ver comprobante</a>
          }
          <div className='marcar-pagado-btns'>
            {
              form.pagado ?
                <button onClick={handlePagadoModalButton}>Marcar como no pagado</button> :
                <button onClick={handlePagadoModalButton}>Marcar como pagado</button>
            }
            <button onClick={handleDeleteButton}>Eliminar inscripción</button>
          </div>
        </div>
      </div>
      {
        confirmarPagadoModal &&
        <div className='confirmar-pago--modal'>
          <div className='confirmar-pago--box'>
            <p>¿Desea cambiar el estado del pago?</p>
            <div>
              <button onClick={handlePagadoModalButton}>Cancelar</button>
              <button onClick={changePagadoSubmit} >Confirmar</button>
            </div>
          </div>
        </div>
      }
      {
        deleteModal &&
        <div className='delete-insc--modal'>
          <div className='delete-insc--box'>
            <p>¿Desea eliminar la inscipción?</p>
            <div>
              <button onClick={handleDeleteButton}>Cancelar</button>
              <button onClick={deleteInsc}>Eliminar</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}