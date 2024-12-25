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
import PrivateRoute from './Components/PrivateRoute';  // Import the PrivateRoute component
import { Footer } from './Components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      console.log('Updated cart:', updatedItems);
      return updatedItems;
    });
  };

  const handleDeleteCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <AppRoutes addToCart={addToCart} cartItems={cartItems} handleDeleteCartItem={handleDeleteCartItem} />
    </Router>
  );
}

function AppRoutes({ addToCart, cartItems, handleDeleteCartItem }) {
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
      {location.pathname !== '/admin-login' && location.pathname !== '/payment' && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage addToCart={addToCart} />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/gallery/:galleryGroupId" element={<Gallery addToCart={addToCart} isAdminLoggedIn={isAdminLoggedIn} />} />

        {/* Protect the UploadAssets route using PrivateRoute */}
        <Route path="/upload-assets" element={<PrivateRoute><UploadAssets /></PrivateRoute>} />

        <Route path="/admin-login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn}/>} />
        <Route
          path="/shopping-cart"
          element={<ShoppingCartPage cartItems={cartItems} handleDeleteCartItem={handleDeleteCartItem} />}
        />
      </Routes>

      {location.pathname !== '/admin-login' && location.pathname !== '/payment' && <Footer />}
    </div>
  );
}

export default App;
