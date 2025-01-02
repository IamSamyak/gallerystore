import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const images = [
    'https://media.istockphoto.com/id/2157230239/photo/wide-angle-panoramic-view-caucasian-wedding-couple-sit-together-on-bench-enjoy-lake-and.jpg?s=612x612&w=0&k=20&c=G-2YIKAC8SjolG0aqil25VUkItcZBBU9avSeKlDF6H0=',
    'https://media.istockphoto.com/id/2159850499/photo/montenegros-sveti-stefan-as-a-picturesque-wedding-destination-combining-historic-architecture.jpg?s=612x612&w=0&k=20&c=Vt16GhmVm8LGSkWa4Yd6c2etfCFvFoSSlOTuc38N0jQ=',
    'https://media.istockphoto.com/id/1300495338/photo/beautiful-bride-and-groom-in-the-nature.jpg?s=612x612&w=0&k=20&c=hD_dk5f0spVyez5QFPsQOJollHb1jYKPV0HrLKladVI=',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [images.length, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="sliderContainer">
      <div
        className="imageContainer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="image"
        />
        <div className="overlayDots">
          {images.map((_, index) => (
            <div
              key={index}
              className="overlayDot"
              style={{
                backgroundColor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              }}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
      <div className="navigationDots">
        {images.map((_, index) => (
          <span
            key={index}
            className="dot"
            style={{
              backgroundColor: currentIndex === index ? 'black' : 'lightgray',
            }}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
