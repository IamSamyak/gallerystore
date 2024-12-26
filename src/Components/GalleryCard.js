import React from 'react';
import CompanyLogo from '../Assets/image-gallery.png';

const GalleryCard = ({ index, imageUrl, onClick }) => {
  return (
    <div className="pics" key={index} onClick={() => onClick(index)}>
      <div style={{ position: 'relative' }}>
        <img src={imageUrl} style={{ width: '100%', borderRadius: '20px' }} alt="gallery" />
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
          <div className="profile-name">
            SHREE DIGITAL
            <img
              src={CompanyLogo}
              height={40}
              width={40}
              style={{ backgroundColor: 'transparent', filter:'invert(100%)' }}
              alt="Shree Digital Photo Logo"
              className="logo-image"
            /> PHOTO</div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
