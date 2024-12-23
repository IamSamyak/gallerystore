import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Alarm } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const AdminLogin = ({setIsAdminLoggedIn}) => {
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
    const { email, password } = formData;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      // Make a POST request to validate admin credentials
      const response = await axios.post(`${config.BASE_URL}/api/admin/login`, {
        email,
        password
      });

      if (response && response.status === 200) {
        setIsLoggedIn(true);
        setIsOtpSent(true);
        setLoginMessage('Email and password verified. OTP sent to your email.'); // Set login success message
        setErrorMessage('');
        setTimer(300); // Reset timer
      } else {
        setErrorMessage('Invalid email or password.');
        setLoginMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setLoginMessage('');
    }
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
        otp, // Plain string, not JSON object
        { withCredentials: true } // Ensure cookies are sent for session persistence
      );
  
      if (response && response.status === 200) {
        alert('OTP Verified Successfully!');
        
        // Store the JWT in sessionStorage
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#2196f3',
            marginBottom: '20px',
          }}
        >
          Admin Login
        </h2>

        {!isLoggedIn ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="email"
                style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="password"
                style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>

            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

            {loginMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{loginMessage}</div>} {/* Display login message */}

            <button
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : isOtpSent ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="otp"
                style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>

            {otpError && <div style={{ color: 'red', marginBottom: '10px' }}>{otpError}</div>} {/* Display OTP error */}

            <div style={{ marginBottom: '10px' }}>
              <IconButton>
                <Alarm />
                <span>{formatTime(timer)}</span>
              </IconButton>
            </div>

            <button
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
              }}
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
