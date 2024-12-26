import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const images = [
    'https://plus.unsplash.com/premium_photo-1734275012690-6d3006fba036?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1734452465230-f571caa4d7d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1730577836014-0689bfc83670?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8'
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Start at the second image (index 1)
  const totalSlides = images.length;
  const slides = [...images]; // Duplicate first and last slides for seamless loop

  useEffect(() => {
    console.log('happening');
    
    const interval = setInterval(() => {     
      // console.log('happening',currentIndex);
      goToNextSlide();
      
    }, 5000); 
    // return () => clearInterval(interval); 
  }, []);

  const goToNextSlide = () => {
    console.log('currentIndex is ',currentIndex); 
    setCurrentIndex((prevIndex)=> (prevIndex+1)%totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Move to the previous slide and reset to the last real image if it reaches the duplicate
      if (prevIndex === 0) return slides.length - 2; // Skip to the last real image
      return prevIndex - 1;
    });
  };

  const goToSlide = (index) => {
    console.log('currentIndex is ',currentIndex); 
    setCurrentIndex(index); 
  };

  return (
    <div className="image-slider">
      <div className="image-slider__slides">
        {/* {slides.map((image, index) => ( */}
          <div className="image-slider__slide">
            <img src={images[currentIndex]} alt={`Slide ${0 + 1}`} />
          </div>
        {/* ))} */}
      </div>
      <div className="image-slider__dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`image-slider__dot ${currentIndex === index ? 'image-slider__dot--active' : ''}`}
            onClick={() => goToSlide(index)} 
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
