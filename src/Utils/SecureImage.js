import { useEffect, useRef } from 'react';

const SecureImage = ({ src }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Handle cross-origin images
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);
    };

    img.onerror = () => {
      console.error('Failed to load image:', src);
    };

    img.src = src;
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block', // Ensure proper layout
        width: '100%',
        height: 'auto',
        pointerEvents: 'none'
      }}
    ></canvas>
  );
};

export default SecureImage;
