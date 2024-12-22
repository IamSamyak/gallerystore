import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./HomePage.css"; 
import config from '../config/config';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [homePageAssets, setHomePageAssets] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error handling
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch assets assets when the component mounts
  useEffect(() => {
    // Make a GET request to the /assets/preview API
    axios.get(`${config.BASE_URL}/assets/preview`)
      .then((response) => {
        // If the response is successful, update the state with the assets
        setHomePageAssets(response.data);
        setLoading(false);  // Stop loading when assets is fetched
      })
      .catch((err) => {
        // Handle error if the API request fails
        console.error('Error fetching assets: ', err);
        setError('Failed to fetch assets');
        setLoading(false);  // Stop loading
      });
  }, []);


  if (loading) {
    return <div>Loading...</div>;  // Display loading message while fetching
  }

  if (error) {
    return <div>{error}</div>;  // Display error message if there is an error
  }

  // Filter images based on search term
  const filteredAssets = homePageAssets.filter((homePageAsset) =>
    homePageAsset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
 <div className="home-page">
    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search by city name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
    />

    <div className="card-container">
      {filteredAssets?.map((filteredAsset, index) => (
        <div className="card" key={index}>
          <div className="image-wrapper">
            <div className="image-stack">
              {/* {filteredAsset?.urls.map((imageUrl, ind) => (
                    <img
                      key={ind}
                      src={imageUrl}
                      alt={`${filteredAsset.customerName}-${ind}`}
                      className="stacked-image"
                      style={{ left: `${ind * 20}px` }} // Adjust overlap position
                    />
                  ))} */}
              <img src={filteredAsset.imageUrl} alt="cover" className="image-stack"/>
            </div>
          </div>
          <div className="card-info">
            <div className="location-name">Customer Name: {filteredAsset.customerName}</div>
            <div className="location-name">Location: {filteredAsset.location}</div>
            <div className="location-name">Cost: ₹ 20000</div>
          </div>

          {/* Buttons */}
          <div className="button-wrapper">
            <div className="btn outline" onClick={() => navigate(`/gallery/${filteredAsset.groupId}`)}>
              DETAILS
            </div>
            <div className="btn fill">BUY NOW</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );

};

export default HomePage;
