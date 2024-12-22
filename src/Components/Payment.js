import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Assuming you will create a Payment.css file to style the form

const Payment = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('Vikas');
  const [number, setNumber] = useState('9999999999');
  const [amount] = useState(1.0);  // Prefill amount based on the total calculated in ShoppingCartPage
  const data = {
    name,
    amount,
    number,
    MUID: "MUID" + Date.now(),
    transactionId: 'T' + Date.now(),
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post('http://localhost:8080/payment/order', { ...data });
      console.log(res);

      if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePayment} className="payment-form">
      <div className='form-group'>
        <label htmlFor="name"><strong>Name:</strong></label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="form-input" 
        />
      </div>
      <div className='form-group'>
        <label htmlFor="number"><strong>Number:</strong></label>
        <input 
          type="text" 
          id="number" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
          className="form-input" 
        />
      </div>
      <div className='form-group'>
        <p><strong>Amount:</strong> ₹{amount}</p>
      </div>
      <div className='form-group'>
        <button type="submit" className="payment-button">Pay Now</button>
      </div>
    </form>
  );
};

export default Payment;
