import React from 'react';
import './PricingPage.css'; // Make sure to define your CSS classes here

const plans = [
  {
    title: 'Silver',
    price: '₹5,000',
    features: ['Basic Photography',
       'Photo Editing', 
       'Online Album Access',
       'Online Album Access',
    ],
  },
  {
    title: 'Gold',
    price: '₹15,000',
    features: [
      'Everything in Silver',
      'Wedding Events',
      'High-Resolution Photos',
      'High-Resolution Photos',
    ],
  },
  {
    title: 'Platinum',
    price: '₹30,000',
    features: [
      'Premium Wedding Events',
      'Custom Photo Albums',
      'Drone Photography',
      'Drone Photography',
    ],
  },
  {
    title: 'Diamond',
    price: '₹35,000',
    features: [
      'Everything in Silver',
      'Wedding Events',
      'High-Resolution Photos',
      'High-Resolution Photos',
    ],
  },
];

const PricingPage = () => {
  const icons = [
    'fas fa-gem',
    'fas fa-crown',
    'fas fa-star',
    'fas fa-diamond',
  ];

  return (
    <div className="card-container-shopping-page">
  {plans.map((plan, index) => (
    <div className="card-wrap" key={index}>
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
        <button className={`card-btn ${['one', 'two', 'three', 'four'][index % 4]}`}>
          Choose 
          {/* {plan.title} */}
        </button>
      </div>
    </div>
  ))}
</div>

  );
};

export default PricingPage;
