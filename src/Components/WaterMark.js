import React from 'react';
import CompanyLogo from '../Assets/image-gallery.png';

const WaterMark = ({ fontSize = '16px', height = '40px' }) => {
  const companyName = 'SHREE DIGITAL';
  const logoAltText = 'Shree Digital Photo Logo';

  return (
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
      <div className="profile-name-watermark" style={{ fontSize: fontSize }}>
        {companyName}
        <img
          src={CompanyLogo}
          style={{
            backgroundColor: 'transparent',
            filter: 'invert(100%)',
            width: 'fit-content',
            height: height
          }}
          alt={logoAltText}
          className="logo-image"
        />
        PHOTO
      </div>
    </div>
  );
};

export default WaterMark;
