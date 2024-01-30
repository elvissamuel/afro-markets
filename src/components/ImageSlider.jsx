import React from 'react'
import bg1 from '../assets/imgs/rafiki.png'
import bg2 from '../assets/imgs/rafiki2.png'
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade, Zoom } from 'react-slideshow-image';

const ImageSlider = () => {
    const imageArray = [
        {
          img: bg1,
          alt: 'bg-1'
        },
        {
          img: bg2,
          alt: 'bg-2'
        },
      ]
      

  return (
    <div>
      <Fade arrows={false} autoplay={true} infinite={true} canSwipe={true}>
                {imageArray.map((image, index) => (
                  <div key={index}>
                    <img src={image.img} className="w-full object-cover" alt={image.alt} />
                  </div>
                ))}
        </Fade>
    </div>
  )
}

export default ImageSlider
