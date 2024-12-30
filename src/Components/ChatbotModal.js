import React, { useState, useEffect, useRef } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CircleIcon from '@mui/icons-material/Circle';
import './ChatbotModal.css'; // Assume you already have the CSS

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef(null);

  const questions = [
    "What is your event?",
    "How many days is the event?",
    "Where is the location?",
    "What is your budget?",
    "Do you have any specific requests?"
  ];

  const fakeResponses = [
    "That's good!",
    "So when are you coming back?",
    "Okay, sometimes talking to you is just like sending letters! You reply so late :P",
    "Fine :P Enjoy your day!",
    "Bye",
    ":)"
  ];

  useEffect(() => {
    if (isOpen) {
      setMessages([{ type: 'bot', text: questions[0] }]);
      setStep(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentNode;

    const handleScroll = () => {
      const isAtBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop === messagesContainer.clientHeight;
      if (isAtBottom) {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    messagesContainer.addEventListener('scroll', handleScroll);

    return () => {
      messagesContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'user', text: inputValue }
      ]);
      setInputValue('');
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'bot', text: '...', isLoading: true } // Show loading animation
        ]);
        scrollToBottom();
      }, 100);
      setTimeout(() => {
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.filter(msg => !msg.isLoading); // Remove loading message
          if (step < questions.length - 1) {
            return [
              ...updatedMessages,
              { type: 'bot', text: fakeResponses[step] },
              { type: 'bot', text: questions[step + 1] }
            ];
          } else {
            return [
              ...updatedMessages,
              { type: 'bot', text: fakeResponses[step] },
              { type: 'bot', text: "Thank you for your responses. We'll get back to you soon!" }
            ];
          }
        });
        setStep(step + 1);
        scrollToBottom(); // Ensure scrolling to bottom after messages update
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="chat">
          <div className="chat-title">
            <h1>Admin Bot</h1>
            <h2>@Ravi_Gore</h2>
            <figure className="avatar">
              <SmartToyIcon style={{ fontSize: 30, color: '#fff' }} />
            </figure>
            <div className="online-status">
              <CircleIcon style={{ fontSize: 10, color: 'green' }} />
              <span style={{ marginLeft: 5 }}>Online</span>
            </div>
          </div>
          <div className="messages">
            <div className="messages-content">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type === 'bot' ? 'new' : 'message-personal'} ${message.isLoading ? 'loading' : ''}`}>
                  {message.type === 'bot' && !message.isLoading && <figure className="avatar"><SmartToyIcon style={{ fontSize: 30, color: '#fff' }} /></figure>}
                  {message.text}
                  {message.type !== 'bot' && <div className="timestamp">{new Date().toLocaleTimeString()}</div>}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          </div>
          <div className="message-box">
            <textarea
              type="text"
              className="message-input"
              placeholder="Type message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            ></textarea>
            <button type="submit" className="message-submit" onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
