import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    'https://plus.unsplash.com/premium_photo-1734275012690-6d3006fba036?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1734452465230-f571caa4d7d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1730577836014-0689bfc83670?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slides every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={styles.sliderContainer}>
      <div style={styles.imageContainer}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={styles.image}
        />
        <div style={styles.overlayDots}>
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.overlayDot,
                backgroundColor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              }}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
      <div style={styles.navigationDots}>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              backgroundColor: currentIndex === index ? 'black' : 'lightgray',
            }}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '600px', // Fixed height
    overflow: 'hidden',
    borderRadius: '15px',
  },
  imageContainer: {
    position: 'relative',
    height: '100%', // Ensure it takes the full height of the container
  },
  image: {
    width: '100%',
    height: '100%', // Ensures the image fills the container
    objectFit: 'cover', // Maintains aspect ratio and crops overflow
    borderRadius: '15px',
  },
  overlayDots: {
    position: 'absolute',
    bottom: '4%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
  },
  overlayDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  navigationDots: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  dot: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    backgroundColor: 'lightgray'
  },
};

export default ImageSlider;
