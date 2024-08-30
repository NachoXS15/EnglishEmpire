import Header from "../Header";
import { MainBanner } from "../MainBanner";
import Footer from "../Footer";
import "./Faq.css"


export default function Faq() {
  return (
    <div className="faq-container">
      <Header></Header>
      <div className="faq-main">
        <MainBanner>Preguntas Frecuentes</MainBanner>
        <div class="faq-preguntas">
          <div class="flex flex-col gap-2">
            <b>1. ¿Cómo me inscribo a un curso?</b>
            <p>Puedes hacerlo de dos formas:</p>
            <p class="pl-3">a. Desde la página principal haciendo clic en el botón "inscripción".</p>
            <p class="pl-3">b. Desde la página de cada curso encontrarás el botón de "inscripción" acompañado con su descripción, programa y valor correspondientes.
            </p>
            <p>En ambos casos, se te dirigirá a un formulario para que cargues tus datos personales y elijas el curso que quieres realizar. En caso de que el alumno/a sea menor de edad, será necesario agregar los datos de su tutor/a. </p>
          </div>
          <div class="flex flex-col gap-2">
            <b>2. ¿Cómo realizo el pago del curso elegido?</b>
            <p>Luego de completar el formulario de inscripción se habilitará la opción de pago.</p>
            <p>Puedes realizarlo con cualquier medio de pago por Mercado Pago o por transferencia o efectivo de forma presencial en el Instituto.</p>
          </div>
          <div class="flex flex-col gap-2">
            <b>3. ¿Cómo ver el programa de un curso?</b>
            <p>Desde la página de cada curso, puedes ver la descripción y descargar el programa de cada uno.</p></div><div class="flex flex-col gap-2"><b>4. ¿Cómo son nuestros planes de estudios?</b><p>Nuestro instituto se enorgullece de ofrecer planes de estudio sólidos y completos que están diseñados para brindar a nuestros estudiantes una experiencia de aprendizaje efectiva y enriquecedora, como así también cuidadosamente estructurados para abarcar todas las áreas clave del aprendizaje del idioma inglés, incluyendo gramática, vocabulario, comprensión auditiva, lectura, escritura y expresión oral.</p><p>Los mismos están basados en los niveles del Marco Común Europeo.</p></div><div class="flex flex-col gap-2"><b>5. ¿Tienen programas para niños/adolescentes/adultos?</b><p>¡Por supuesto! Tenemos el placer de ofrecer una amplia gama de programas diseñados para atender a todas las edades. En nuestro instituto de inglés, reconocemos la importancia de adaptar nuestra enseñanza a las necesidades específicas de cada grupo demográfico. Por lo tanto, contamos con programas especialmente diseñados para niños, adolescentes y adultos.</p></div><div class="flex flex-col gap-2"><b>6. ¿Con qué material bibliográfico trabajan?</b><p>Contamos con una amplia variedad de libros de distintos autores, nacionales e internacionales, para todos los niveles, y además, contamos con modelos de exámenes.</p><p>Todo a disposición de nuestros alumnos.</p></div><div class="flex flex-col gap-2"><b>7. ¿Ofrecen clases en línea o presenciales?</b><p>Nuestro instituto cuenta con clases presenciales para todos los grupos, además de la posibilidad de clases en formato virtual junto con todos los recursos necesarios para adultos y con planes de ampliar a todas las edades posibles.</p></div><div class="flex flex-col gap-2"><b>8. ¿Qué alcance tiene nuestra titulación?</b><p>Nuestra institución cuenta con el aval de la Universidad Tecnológica Nacional (UTN), cuya certificación tiene validez oficial y nacional Resolución 857/95 Disposición 66/01 y acreditado en los términos de la disposición Nro. 1527/2017, siendo reconocido por universidades e instituciones de renombre.</p></div><div class="flex flex-col gap-2"><b>9. ¿Cómo puedo contactar al instituto en caso de preguntas adicionales?</b><p>Si todavía te queda alguna duda, puedes contactarnos vía whatsapp al +54 9 3804167421, o por nuestras redes sociales.</p></div></div>
      </div>
      <Footer></Footer>

    </div>
  )
}