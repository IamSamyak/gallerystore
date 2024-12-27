import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CompanyLogo from '../Assets/image-gallery.png';
import NavbarLogo from '../Assets/NavbarLogo.png';
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu icon from MUI
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState("Home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900); // Check initial screen size
  const [showMenu, setShowMenu] = useState(false); // Menu visibility state

  useEffect(() => {
    // Check if 'isAdminLoggedIn' exists in sessionStorage
    const adminStatus = sessionStorage.getItem('isAdminLoggedIn');
    if (adminStatus === 'true') {
      setIsAdminLoggedIn(true); // Set state based on sessionStorage
    }

    // Update the screen size state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Update the selectedLink when the route changes
    if (location.pathname === '/') {
      setSelectedLink('Home');
    } else if (location.pathname === '/pricing') {
      setSelectedLink('Pricing');
    } else if (location.pathname === '/upload-assets') {
      setSelectedLink('Upload Assets');
    } else if (location.pathname === '/shopping-cart') {
      setSelectedLink('Cart');
    } else if (location.pathname === '/contact-us') {
      setSelectedLink('Contact Us');
    } else if (location.pathname === '/logout') {
      setSelectedLink('Logout');
    }
  }, [location]);

  const handleNavigation = (link) => {
    if (link === 'Home') {
      navigate('/');
    } else if (link === 'Pricing') {
      navigate('/pricing');
    } else if (link === 'Upload Assets' && isAdminLoggedIn) {
      navigate('/upload-assets');
    } else if (link === 'Cart' && !isAdminLoggedIn) {
      navigate('/shopping-cart');
    } else if (link === 'Contact Us' && !isAdminLoggedIn) {
      navigate('/contact-us');
    } else if (link === 'Logout') {
      sessionStorage.removeItem('isAdminLoggedIn');
      setIsAdminLoggedIn(false);
      navigate('/');
    }
    setShowMenu(false); // Close the menu after navigation
  };

  return (
    <div className='navbar-wrapper'>
      <div className='admin-info'>
        <div className="logo-container" >         
          <img src={NavbarLogo} alt="Logo" className="logo-image" />
        </div>
      </div>
      {isMobile ? (
        <div className='navbar-container'>
          <MenuIcon className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <ul className="mobile-menu">
              <li
                className={selectedLink === 'Home' ? 'selected' : ''}
                onClick={() => handleNavigation('Home')}
              >
                Home
              </li>
              <li
                className={selectedLink === 'Pricing' ? 'selected' : ''}
                onClick={() => handleNavigation('Pricing')}
              >
                Pricing
              </li>
              {isAdminLoggedIn ? (
                <li
                  className={selectedLink === 'Upload Assets' ? 'selected' : ''}
                  onClick={() => handleNavigation('Upload Assets')}
                >
                  Upload Assets
                </li>
              ) : (
                <li
                  className={selectedLink === 'Contact Us' ? 'selected' : ''}
                  onClick={() => handleNavigation('Contact Us')}
                >
                  Contact Us
                </li>
              )}
              {!isAdminLoggedIn ? (
                <li
                  className={selectedLink === 'Cart' ? 'selected' : ''}
                  onClick={() => handleNavigation('Cart')}
                >
                  Cart
                </li>
              ) : (
                <li
                  className={selectedLink === 'Logout' ? 'selected' : ''}
                  onClick={() => handleNavigation('Logout')}
                >
                  Logout
                </li>
              )}
            </ul>
          )}
        </div>
      ) : (
        <div className='navbar-container'>
          <ul>
            <li
              className={selectedLink === 'Home' ? 'selected' : ''}
              onClick={() => handleNavigation('Home')}
            >
              Home
            </li>
            <li
              className={selectedLink === 'Pricing' ? 'selected' : ''}
              onClick={() => handleNavigation('Pricing')}
            >
              Pricing
            </li>
            {isAdminLoggedIn ? (
              <li
                className={selectedLink === 'Upload Assets' ? 'selected' : ''}
                onClick={() => handleNavigation('Upload Assets')}
              >
                Upload Assets
              </li>
            ) : (
              <li
                className={selectedLink === 'Contact Us' ? 'selected' : ''}
                onClick={() => handleNavigation('Contact Us')}
              >
                Contact Us
              </li>
            )}
            {!isAdminLoggedIn ? (
              <li
                className={selectedLink === 'Cart' ? 'selected' : ''}
                onClick={() => handleNavigation('Cart')}
              >
                Cart
              </li>
            ) : (
              <li
                className={selectedLink === 'Logout' ? 'selected' : ''}
                onClick={() => handleNavigation('Logout')}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
