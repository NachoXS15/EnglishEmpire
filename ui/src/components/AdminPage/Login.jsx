import logo from '../../assets/logo.png'
import '../../styles/AdminPage/Login.css'

export default function Login() {
  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className="login--header">
          <img src={logo} alt="Engish Empire" />
          <h2>Administración</h2>
        </div>
        <form className='login--form-container'>
          <input type="text" placeholder='Email' />
          <input type="password" placeholder='Contraseña' />
          <button className='login-button'>Ingresar</button>
        </form>
        <div>
          <a href=''>¿Problemas para iniciar sesión? Click aqui</a>
        </div>
      </div>
    </div>
  )
}