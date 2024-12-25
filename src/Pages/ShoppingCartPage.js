import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "./ShoppingCartPage.css";
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PhotoIcon from '@mui/icons-material/Photo';

const ShoppingCartPage = ({ cartItems, handleDeleteCartItem }) => {
  const navigate = useNavigate();

  // Calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.cost, 0);
  };

  const handleCheckout = () => {
    // Redirect to the payment page or handle further logic here
    navigate('/payment');
  };

  const getRandomMedia = (name) => {
    const isVideo = Math.random() < 0.5; // Randomly choose between image and video
    if (isVideo) {
      return (
        <span className="media-type">
          Video <VideoFileIcon sx={{color:'#475569'}}/>
        </span>
      );
    }
    return (
      <span className="media-type">
        Image <PhotoIcon sx={{color:'#475569'}} />
      </span>
    );
  };  

  return (
    <div className="shopping-cart-container">
      <div className="order-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Shopping Cart</h2>
      <p style={{fontWeight:'500',fontSize:'1.25rem'}}>{cartItems ? cartItems.length : 0} items</p>
        </div>
        <div className="cart-items-container">
          <table className="cart-items-table">
            <thead>
              <tr>
                <th>Nice</th>
                <th>Media Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {cartItems?.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td><img src={item.imageUrl} alt="Product" className="cart-item-image" /></td>
                  <td>{getRandomMedia(item.name)}</td>
                  <td>₹{item.cost}</td>
                  <td>
                    <DeleteIcon
                      onClick={() => handleDeleteCartItem(item.id)}
                      className="delete-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="order-summary-card">
        <h3>Order Summary</h3>
        <p className="total-price"><span style={{fontWeight:'550'}}>Total</span>: ₹{calculateTotal()}</p>
        <button onClick={handleCheckout} className="checkout-button">Checkout</button>

        <div className="payment-methods">
          <p>We accept:</p>
          <div className="payment-icons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/768px-Google_Pay_Logo.svg.png?20221017164555"
              alt="Google Pay"
              className="payment-icon"
            />
            <img
              src="https://th.bing.com/th?id=OIP.Yobol-DtbP0LEyrFnSYw6gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="Visa"
              className="payment-icon"
            />
            <img
              src="https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg"
              alt="Paytm"
              className="payment-icon"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="payment-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
