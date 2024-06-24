import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import '../../styles/AdminPage/Login.css'
import { signIn } from '../../config/auth'
import { useAuth } from '../../config/AuthProvider'
import { useNavigate } from 'react-router'
import { auth } from '../../config/firebase-config'

export default function Login() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/menu');
    }
  }, [isLogged, navigate]);

  const signInAuth = async () => {
    try {
      await signIn(formData.email, formData.password);
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      const token = await user.getIdToken();
      console.log('Token:', token);

      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to authenticate');
      }

      const data = await response.json();
      const jwtToken = data.jwt;

      localStorage.setItem('token', jwtToken);
      console.log('Sesión Iniciada');
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Re-throw the error to handle it in handleSubmit
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
      setIsLogged(true);
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
          <div className='other-error'>
            <button type='submit' className='login-button'>Ingresar</button>
            {errors.others && <span>{errors.others}</span>}
          </div>
        </form>
        <div>
          <a href=''>¿Problemas para iniciar sesión? Click aqui</a>
        </div>
      </div>
    </div>
  );
}