import React, { useState, useEffect } from 'react';
import './Footer.css';

export const Footer = () => {
  const phrases = [
    'Timeless moments.',
    'Captured perfection.',
    'Unforgettable memories.',
    'Story in frames.'
  ];

  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const typingSpeed = 150; // Speed in milliseconds
  const pauseDuration = 2000; // Pause duration in milliseconds

  useEffect(() => {
    let timeout;

    const typewriterEffect = () => {
      if (isTyping) {
        const currentPhrase = phrases[currentPhraseIndex];

        if (charIndex < currentPhrase.length) {
          setTypedText((prev) => prev + currentPhrase[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsTyping(false); // Pause after typing completes
          timeout = setTimeout(() => {
            setTypedText('');
            setCharIndex(0); // Reset character index
            setIsTyping(true); // Start typing next phrase

            // Move to the next phrase in a circular fashion
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          }, pauseDuration);
        }
      }
    };

    if (isTyping) {
      const interval = setInterval(typewriterEffect, typingSpeed);
      return () => clearInterval(interval); // Cleanup interval on unmount
    }

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [isTyping, charIndex, currentPhraseIndex, phrases, typingSpeed, pauseDuration]);

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and About Section */}
        <div className="footer-section footer-logo">
          {/* <img src="logo.png" alt="Photographer Logo" /> */}
          <h1>
            COME FOR THE PHOTOS, STAY FOR THE{' '}
            <span className="typewriter" style={{ color: '#D15151' }}>{typedText}</span>
          </h1>
        </div>

        {/* Contact Info */}
        <div className="footer-section" style={{ paddingLeft: '3%', paddingRight: '3%' }}>
          <h3>Get in Touch</h3>
          <p>Email: <a href="mailto:contact@yourphotography.com">your-contact@email.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
          <p>Location: New York, NY</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3>Follow Me</h3>
          <div className="footer-social-row spaced">
            <a href="https://instagram.com" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://facebook.com" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://pinterest.com" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i> Pinterest
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 Shree Digital Photo. All rights reserved.</p>
      </div>
    </footer>
  );
};
