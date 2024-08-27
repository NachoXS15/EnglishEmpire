import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import '../../styles/AdminPage/Login.css';
import { useNavigate } from 'react-router';
import { browserLocalPersistence, browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [mantenerSesion, setMantenerSesion] = useState(false)

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('user', currentUser)
        navigate('../menu')
      }
    });

    return () => unsubscribe();
  }, [])

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    if (e.target.id == 'sesion') {
      setMantenerSesion(!mantenerSesion)
      return
    }
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const signInAuth = async () => {
    try {
      if (mantenerSesion) {
        await setPersistence(auth, browserLocalPersistence)
      } else {
        await setPersistence(auth, browserSessionPersistence)
      }
      const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Registrado: ', user)
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Escriba su email';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email no válido';
    }
    if (!formData.password.trim()) {
      errors.password = 'Escriba su contraseña';
    }

    // Si hay errores, no enviar el formulario
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});
    try {
      await signInAuth();
    } catch (error) {
      setErrors({
        others: "Ingrese datos válidos"
      });
    }
  };


  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className="login--header">
          <img src={logo} alt="Engish Empire" />
          <h2>Administración</h2>
        </div>
        <form className='login--form-container' onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name='email'
              value={formData.email}
              placeholder='Correo electronico'
              onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <input
              type="password"
              name='password'
              value={formData.password}
              placeholder='Contraseña'
              onChange={handleChange} />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className='sesion-div'>
            <label htmlFor="sesion">Mantener la sesión</label>
            <input type="checkbox" checked={mantenerSesion} name="sesion" id="sesion" onChange={handleChange} />
          </div>
          <div className='other-error'>
            <button type='submit' className='login-button'>Ingresar</button>
            {errors.others && <span>{errors.others}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}