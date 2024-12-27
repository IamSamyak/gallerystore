import React from 'react';
import WaterMark from './WaterMark';

const GalleryCard = ({ index, imageUrl, onClick }) => {
  return (
    <div className="pics" key={index} onClick={() => onClick(index)}>
      <div style={{ position: 'relative' }}>
        <img src={imageUrl} style={{ width: '100%', borderRadius: '20px' }} alt="gallery" />
        <WaterMark/>
      </div>
    </div>
  );
};

export default GalleryCard;
