import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const location = useLocation(); // Get the current location (route)
  const [selectedLink, setSelectedLink] = useState("Home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); 

  useEffect(() => {
    // Check if 'isAdminLoggedIn' exists in sessionStorage
    const adminStatus = sessionStorage.getItem('isAdminLoggedIn');
    if (adminStatus === 'true') {
      setIsAdminLoggedIn(true); // Set state based on sessionStorage
    }
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
  }, [location]); // Run this effect whenever the route changes

  const handleNavigation = (link) => {
    // setSelectedLink(link); // This will update the selectedLink state
    if (link === 'Home') {
      navigate('/'); // Navigate to Home page
    } else if (link === 'Pricing') {
      navigate('/pricing'); // Navigate to Pricing page
    } else if (link === 'Upload Assets' && isAdminLoggedIn) {
      navigate('/upload-assets'); // Navigate to Upload Assets page (for admin)
    } else if (link === 'Cart' && !isAdminLoggedIn) {
      navigate('/shopping-cart'); // Navigate to Shopping Cart page (for normal users)
    }else if (link === 'Contact Us' && !isAdminLoggedIn) {
      navigate('/contact-us'); // Navigate to Shopping Cart page (for normal users)
    } 
    else if (link === 'Logout') {
      sessionStorage.removeItem('isAdminLoggedIn'); // Remove admin login status from sessionStorage
      setIsAdminLoggedIn(false); // Update state to reflect that the user is logged out
      navigate('/'); // Redirect to the homepage or login page after logout
    }
  };

  return (
    <div className='navbar-wrapper'>
      <div className='navbar_container'>
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

          {/* Conditionally render 'Contact Us' or 'Upload Assets' */}
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

          {/* Conditionally render Cart or Logout */}
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
    </div>
  );
}

export default Navbar;
