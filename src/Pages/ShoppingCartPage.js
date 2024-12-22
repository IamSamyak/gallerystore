import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "./ShoppingCartPage.css";

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

  return (
    <div className="shopping-cart-container">
      <div className="order-card">
        <h2>Your Shopping Cart</h2>
        <p>You have {cartItems ? cartItems.length : 0} items in your cart.</p>
        <div className="cart-items-container">
          {cartItems?.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt="Product" className="cart-item-image" />
              <span className="cart-item-price">₹{item.cost}</span>
              <DeleteIcon
                onClick={() => handleDeleteCartItem(item.id)}
                className="delete-icon"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary-card">
        <h3>Order Summary</h3>
        <p className="total-price">Total: ₹{calculateTotal()}</p>
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
