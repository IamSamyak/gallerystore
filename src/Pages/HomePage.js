import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import config from "../config/config";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import ImageSlider from "../Components/ImageSlider";
import HomePageCard from "../Components/HomePageCard";
import DateRangePicker from "../Components/DateRangePicker";

const HomePage = ({ isDarkMode }) => {
  const [homePageAssets, setHomePageAssets] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date

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

  // Programmatically navigate to the SearchBar div when the component mounts or is navigated to
  useEffect(() => {
    if (location.state && location.state.focusOn) {
      const part = location.state.focusOn;

      if (part === 'SearchBar') {
        const handleScroll = () => {
          const searchBarElement = document.getElementById("searchBarDiv");
          if (searchBarElement) {
            searchBarElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          }
        };
        setTimeout(handleScroll, 100);
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredAssets = homePageAssets.filter((homePageAsset) =>
    Object.entries(homePageAsset).some(([key, value]) =>
      key !== "date" && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="home-page">
      <ImageSlider />
      {/* <div className="banner">
        <img
          // src="https://media.istockphoto.com/id/1124687034/photo/man-on-wheelchair-taking-photos-of-beautiful-landscape-in-a-foggy-morning-st-thomas-slovenia.jpg?s=1024x1024&w=is&k=20&c=e0uuTVFb3TLlt02m2EAm_1LuRw8gyMBsPk9FF24JZDk=" 
          src="https://store.sony.com.au/on/demandware.static/-/Library-Sites-sony-shared-library/default/dwb1bfa1fa/content/category/cameras/camera-category-banner.jpg"
          alt="Banner"
          className="banner-image"
        />
      </div> */}
      <div className="exciting-message">
        <h2 style={{ color: isDarkMode ? '#FFF' : '#333' }}>Welcome to the World of Photography by Ravi Gore!</h2>
        <p style={{ color: isDarkMode ? '#CCC' : '#555' }}>
          "Capturing moments, telling stories, and freezing time with every click. Explore breathtaking landscapes, beautiful portraits, and much more through my lens. Join me on this visual journey to discover the art of photography in its purest form."
        </p>
      </div>

      <div id="searchBarDiv">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* <div className="home-page-date-container">
        <DateRangePicker/>
      </div> */}

      <div className="home-page-card-container">
        {filteredAssets.map((filteredAsset, index) => (
          <HomePageCard
            key={index}
            imageUrl={filteredAsset.imageUrl}
            customerName={filteredAsset.customerName}
            location={filteredAsset.location}
            date="25-09-2022"
            cost="₹ 20000"
            onDetailsClick={() => navigate(`/gallery/${filteredAsset.groupId}`)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
