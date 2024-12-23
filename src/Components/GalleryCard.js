import React from 'react';

const GalleryCard = ({ index, imageUrl, onClick }) => {
  return (
    <div className="pics" key={index} onClick={() => onClick(index)}>
      <div style={{ position: 'relative' }}>
        <img src={imageUrl} style={{ width: '100%' }} alt="gallery" />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '16px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          @Ravi_Gore
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
