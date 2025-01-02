import React, { useState } from 'react';
import './PricingPage.css';
import '../Components/PricingPageModal.css';
import CloseIcon from "@mui/icons-material/Close";

const plans = [
  {
    title: 'Silver',
    price: '₹5,000',
    features: ['Basic Photography', 'Photo Editing', 'Online Album Access', 'Online Album Access'],
  },
  {
    title: 'Gold',
    price: '₹15,000',
    features: ['Everything in Silver', 'Wedding Events', 'High-Resolution Photos', 'High-Resolution Photos'],
  },
  {
    title: 'Platinum',
    price: '₹30,000',
    features: ['Premium Wedding Events', 'Custom Photo Albums', 'Drone Photography', 'Drone Photography'],
  },
  {
    title: 'Diamond',
    price: '₹35,000',
    features: ['Everything in Silver', 'Wedding Events', 'High-Resolution Photos', 'High-Resolution Photos'],
  },
];

const PricingPage = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const icons = ['fas fa-gem', 'fas fa-crown', 'fas fa-star', 'fas fa-diamond'];

  return (
    <>
      <div className="card-container-shopping-page">
        {plans.map((plan, index) => (
          <div
            className={`card-wrap-pricing-page ${isDarkMode ? 'card-wrap-pricing-page-dark-mode' : ''}`}
            key={index}
          >
            <div className={`card-header ${['one', 'two', 'three', 'four'][index % 4]}`}>
              <i className={icons[index % icons.length]}></i>
            </div>
            <div className="card-content">
              <h1 className="card-title">{plan.title}</h1>
              <p className="card-price">{plan.price}</p>
              <div className="card-features">
                {plan.features.map((feature, i) => (
                  <div key={i}>{feature}</div>
                ))}
              </div>
              <button
                style={{ cursor: 'pointer' }}
                className={`card-btn ${['one', 'two', 'three', 'four'][index % 4]}`}
                onClick={handleModalOpen}
              >
                Choose
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Icon */}
            <CloseIcon
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                color: '#333',
                fontSize: '24px',
              }}
              onClick={handleModalClose}
            />
            <h2>Event Details</h2>
            <form>
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" placeholder="Enter the event name" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Duration (in hours)</label>
                <input type="number" placeholder="Enter the duration" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Enter the location" />
              </div>
              <button type="submit" className="modal-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingPage;
