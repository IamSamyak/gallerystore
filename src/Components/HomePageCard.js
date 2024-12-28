import React from "react";
import "./HomePageCard.css";
import WaterMark from "./WaterMark";

const HomePageCard = ({
  imageUrl,
  customerName,
  location,
  date,
  cost,
  onDetailsClick,
  isDarkMode,
}) => {
  return (
    <div className={`home-page-card ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="home-page-card-image-wrapper">
        <div className="home-page-card-image-stack" style={{ position: 'relative' }}>
          <img
            src={imageUrl}
            alt="cover"
            className="home-page-card-image-stack"
          />
          <WaterMark />
        </div>
      </div>
      <div className="home-page-card-info">
        <div className="home-page-card-location-name">
          <span style={{ fontWeight: "500" }}>Customer Name</span>: {customerName}
        </div>
        <div className="home-page-card-location-name">
          <span style={{ fontWeight: "500" }}>Location</span>: {location}
        </div>
        <div className="home-page-card-location-name">
          <span style={{ fontWeight: "500" }}>Date</span>: {date}
        </div>
        <div className="home-page-card-location-name">
          <span style={{ fontWeight: "500" }}>Cost</span>: {cost}
        </div>
      </div>
      <div className="home-page-card-button-wrapper">
        <div className="home-page-card-btn home-page-card-btn-outline" onClick={onDetailsClick}>
          DETAILS
        </div>
        <div className="home-page-card-btn home-page-card-btn-fill">
          BUY NOW
        </div>
      </div>
    </div>
  );
};

export default HomePageCard;
