import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Alarm } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import './AdminLogin.css'

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [errorMessage, setErrorMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState(''); // Added login message state
  const [otpError, setOtpError] = useState(''); // Added OTP error state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disable

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle login (email and password validation with API)
  const handleLogin = async () => {
    setIsButtonDisabled(true);
    const { email, password } = formData;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      // Make a POST request to validate admin credentials
      const response = await axios.post(`${config.BASE_URL}/api/admin/login`, {
        email,
        password,
      },{ withCredentials: true });

      if (response && response.status === 200) {
        setIsLoggedIn(true);
        setIsOtpSent(true);
        setLoginMessage('Email and password verified. OTP sent to your email.');
        setErrorMessage('');  // Clear error message on success
        setTimer(300);  // Reset timer
      } else {
        // Handle non-200 response
        setErrorMessage('Invalid email or password.');
        setLoginMessage('');
      }
    } catch (error) {
      // Check for a 401 error status
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setLoginMessage('');
    }
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  // Handle OTP verification using the /verify-otp route
  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError('Please enter the OTP.');
      return;
    }

    try {
      // Make a POST request to verify OTP
      const response = await axios.post(
        `${config.BASE_URL}/api/admin/verify-otp`,
        { otp },  // Send the OTP as part of the request body
        {
          headers: {
            'Content-Type': 'application/json' // Ensure content type is JSON
          },
          withCredentials: true // Ensure cookies are sent for session persistence
        }
      );
      

      if (response && response.status === 200) {
        alert('OTP Verified Successfully!');
        sessionStorage.setItem('jwtToken', response.data.jwtToken);
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        setIsAdminLoggedIn(true);
        navigate('/upload-assets');
      } else {
        setOtpError('Invalid OTP!');
      }
    } catch (error) {
      setOtpError('An error occurred while verifying OTP. Please try again.');
    }
  };

  // Timer for OTP expiration
  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      setErrorMessage('OTP has expired. Please request a new OTP.');
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2 className="admin-login-title">Admin Login</h2>

        {!isLoggedIn ? (
          <>
            <div className="admin-login-input">
              <label htmlFor="email" className="admin-login-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="admin-login-input-field"
              />
            </div>

            <div className="admin-login-input">
              <label htmlFor="password" className="admin-login-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="admin-login-input-field"
              />
            </div>

            {errorMessage && <div className="admin-login-error">{errorMessage}</div>}
            {loginMessage && <div className="admin-login-success">{loginMessage}</div>}

            <button
              className={`admin-login-button ${isButtonDisabled ? 'disabled' : ''}`}
              onClick={handleLogin}
              disabled={isButtonDisabled} // Disable button on click
            >
              Login
            </button>
          </>
        ) : isOtpSent ? (
          <>
            <div className="admin-login-input">
              <label htmlFor="otp" className="admin-login-label">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                className="admin-login-input-field"
              />
            </div>

            {otpError && <div className="admin-login-error">{otpError}</div>}

            <div className="admin-login-timer">
              <IconButton>
                <Alarm />
                <span>{formatTime(timer)}</span>
              </IconButton>
            </div>

            <button
              className="admin-login-button"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminLogin;
