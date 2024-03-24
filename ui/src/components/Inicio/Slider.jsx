/* eslint-disable react/prop-types */
import '../../styles/Slider.css'

import { useState } from 'react'
import { useEffect } from 'react'


export default function Slider({ images, text, link, interval = true }) {
  const [currentImage, setCurrentImage] = useState(0)
  const intervalDuration = 6000;

  useEffect(() => {
    if (!interval) {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, intervalDuration)

    return () => clearInterval(intervalId)
  }, [currentImage, images.length, intervalDuration, interval])


  return (
    <div className='slider'>
      <img src={images[currentImage]} alt="" />
      <a href={link} className='inscripcion-btn'>{text}</a>
    </div>
  )

}