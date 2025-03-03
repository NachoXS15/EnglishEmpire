import '../../styles/Inicio.css'
import Header from '../Header';
import Slider from './Slider';
import Footer from '../Footer';
import sliderimg1Deskt from '../../assets/slides/desk-slide-img-1.png'
import sliderimg2Deskt from '../../assets/slides/desk-slide-img-2.png'
import sliderimg3Deskt from '../../assets/slides/desk-slide-img-3.png'
import sliderimg1Mobile from '../../assets/slides/mobile-slide-img-1.png'
import sliderimg2Mobile from '../../assets/slides/mobile-slide-img-2.png'
import sliderimg3Mobile from '../../assets/slides/mobile-slide-img-3.png'
import cursosBannerDesk from '../../assets/slides/banner-cursos-desk.png'
import cursosBannerMobile from '../../assets/slides/banner-cursos-mobile.png'
import joinusBannerDesk from '../../assets/slides/banner-joinus-desk.png'
import joinusBannerMobile from '../../assets/slides/banner-joinus-mobile.png'
import utnIcon from '../../assets/icons/icon-utn.png'
import { useEffect, useState } from 'react';


function Inicio() {
  const imagesDesktop = [sliderimg1Deskt, sliderimg2Deskt, sliderimg3Deskt]
  const imagesMobile = [sliderimg1Mobile, sliderimg2Mobile, sliderimg3Mobile]
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 950);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 950);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='main-container'>
      <Header />
      <Slider
        images={!isScreenSmall ? imagesDesktop : imagesMobile}
        text='Inscripción 2025'
        link='/inscripcion'
        imgAlt='Aprende inglés con los cursos personalizados de English Empire'
      />
      <div className='cursos-section'>
        <h2 className='title'>Nuestros Cursos</h2>
        <p>Creamos cursos personalizados de acuerdo a los deseos y necesidades de nuestro alumnos, donde nuestros docentes son la principal clave para lograr un marcado progreso en el menor tiempo posible.</p>
      </div>
      <Slider
        images={[isScreenSmall ? cursosBannerMobile : cursosBannerDesk]}
        text='Ver cursos'
        link='/cursos'
        interval={false}
        imgAlt='Aprende inglés con los cursos personalizados de English Empire'
      />
      <div className='certificacion-section'>
        <h2 className='title'>Certificados con <b>validez nacional y oficial.</b></h2>
        <ul>
          <li>Nuestros certificados cuenta con la aprobación del Ministerio de Educación, lo que garantiza su reconocimiento en diversas universidades, instituciones y empresas. Obtén tu certificación con nosotros y abre las puertas a nuevas oportunidades educativas y profesionales.</li>
          <li>Ofrecemos certificaciones adaptadas a todas las edades y niveles, desde A1 hasta C3. Sea cual sea tu punto de partida, estamos aquí para guiarte en tu camino hacia el dominio del inglés.</li>
          <li>El prestigio de nuestra institución en la enseñanza de idiomas proporciona una ventaja significativa para los estudiantes, respaldado por nuestras reconocidas trayectorias. Tu elección de estudiar con nosotros no solo garantiza un aprendizaje de calidad, sino también el acceso a oportunidades excepcionales que fortalecerán tu camino académico y profesional.</li>
        </ul>
        <img src={utnIcon} alt="UTN logo" />
      </div>
      <Slider
        images={[isScreenSmall ? joinusBannerMobile : joinusBannerDesk]}
        text='Postulate'
        link='/postulate'
        interval={false}
        imgAlt='Unete a nuestro equipo, postulate!'
      />
      <Footer></Footer>
    </div>
  )
}

export default Inicio
