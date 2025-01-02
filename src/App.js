import './App.css';
import Navbar from './Components/Navbar';
import Homepage from './Pages/HomePage';
import { useEffect, useState } from 'react';
import PricingPage from './Pages/PricingPage';
import ContactUsPage from './Pages/ContactUsPage';
import UploadAssets from './Pages/UploadAssets';
import ShoppingCartPage from './Pages/ShoppingCartPage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Gallery from './Pages/Gallery';
import AdminLogin from './Pages/AdminLogin';
import Payment from './Components/Payment';
import PrivateRoute from './Components/PrivateRoute';  
import { Footer } from './Components/Footer';
import FileUpload from './Pages/TempAsset';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    // Change body background color based on isDarkMode
    document.body.style.backgroundColor = isDarkMode ? '#0D0D0D' : 'white';
  }, [isDarkMode]); // Run this effect whenever isDarkMode changes

  return (
    <Router>
      <AppRoutes addToCart={addToCart} cartItems={cartItems} removeFromCart={removeFromCart} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
    </Router>
  );
}

function AppRoutes({ addToCart, cartItems, removeFromCart, isDarkMode }) {
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(sessionStorage.getItem('isAdminLoggedIn')); 
  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault(); // Prevent the default context menu
    };

    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return (
    <div>
      {location.pathname !== '/admin-login' && location.pathname !== '/payment' && <Navbar isDarkMode={isDarkMode}/>}

      <Routes>
        <Route path="/" element={<Homepage isDarkMode={isDarkMode} addToCart={addToCart}/>} />
        <Route path="/pricing" element={<PricingPage isDarkMode={isDarkMode}/>} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/contact-us" element={<ContactUsPage isDarkMode={isDarkMode}/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/gallery/:galleryGroupId" element={<Gallery cartItems={cartItems} addToCart={addToCart} isAdminLoggedIn={isAdminLoggedIn} isDarkMode={isDarkMode} removeFromCart={removeFromCart}/>} />

        {/* Protect the UploadAssets route using PrivateRoute */}
        <Route path="/upload-assets" element={<PrivateRoute><UploadAssets /></PrivateRoute>} />

        <Route path="/admin-login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn}/>} />
        <Route
          path="/shopping-cart"
          element={<ShoppingCartPage cartItems={cartItems} removeFromCart={removeFromCart} isDarkMode={isDarkMode}/>}
        />
      </Routes>

      {location.pathname !== '/admin-login' && location.pathname !== '/payment' && <Footer isDarkMode={isDarkMode}/>}
    </div>
  );
}

export default App;
