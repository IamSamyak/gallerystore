import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import ImageSlider from "../Components/ImageSlider";

const HomePage = () => {
  const [homePageAssets, setHomePageAssets] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch assets when the component mounts
  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/assets/preview`)
      .then((response) => {
        setHomePageAssets([...response.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assets: ", err);
        setError("Failed to fetch assets");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter assets based on search term
  const filteredAssets = homePageAssets.filter((homePageAsset) =>
    homePageAsset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* <div className="banner">
        <img
          // src="https://media.istockphoto.com/id/1124687034/photo/man-on-wheelchair-taking-photos-of-beautiful-landscape-in-a-foggy-morning-st-thomas-slovenia.jpg?s=1024x1024&w=is&k=20&c=e0uuTVFb3TLlt02m2EAm_1LuRw8gyMBsPk9FF24JZDk="
          src="https://store.sony.com.au/on/demandware.static/-/Library-Sites-sony-shared-library/default/dwb1bfa1fa/content/category/cameras/camera-category-banner.jpg"
          alt="Banner"
          className="banner-image"
        />
      </div> */}
      
      <ImageSlider/>

      <div className="exciting-message">
        <h2>Welcome to the World of Photography by Ravi Gore!</h2>
        <p>
          "Capturing moments, telling stories, and freezing time with every click. Explore breathtaking landscapes, beautiful portraits, and much more through my lens. Join me on this visual journey to discover the art of photography in its purest form."
        </p>
      </div>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Cards container */}
      <div className="card-container">
        {filteredAssets.map((filteredAsset, index) => (
          <div className="card" key={index}>
            <div className="image-wrapper">
              <div className="image-stack">
                <img
                  src={filteredAsset.imageUrl}
                  alt="cover"
                  className="image-stack"
                />
              </div>
            </div>
            <div className="card-info">
              <div className="location-name">
                <span style={{ fontWeight: "500" }}>Customer Name</span>:{" "}
                {filteredAsset.customerName}
              </div>
              <div className="location-name">
                <span style={{ fontWeight: "500" }}>Location</span>:{" "}
                {filteredAsset.location}
              </div>
              <div className="location-name">
                <span style={{ fontWeight: "500" }}>Date</span>:{" "}
                25-09-2022
              </div>
              <div className="location-name">
                <span style={{ fontWeight: "500" }}>Cost</span>: ₹ 20000
              </div>
            </div>
            <div className="button-wrapper">
              <div
                className="btn outline"
                onClick={() => navigate(`/gallery/${filteredAsset.groupId}`)}
              >
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
