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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    setLoading(true);
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

  useEffect(() => {
    const applyFilters = () => {
      let filteredByDate = homePageAssets;

      if (startDate && endDate) {
        filteredByDate = homePageAssets.filter((asset) => {
          const assetDate = new Date(asset.date);
          return assetDate >= startDate && assetDate <= endDate;
        });
      }

      const filteredBySearchTerm = filteredByDate.filter((homePageAsset) =>
        Object.entries(homePageAsset).some(([key, value]) =>
          key !== "date" && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      setFilteredAssets(filteredBySearchTerm);
    };

    applyFilters();
  }, [searchTerm, startDate, endDate, homePageAssets]);

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
  }, [location.state, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const ApplyDateRangeFilter = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="home-page">
      <ImageSlider />

      <div className="exciting-message">
        <h2 style={{ color: isDarkMode ? '#FFF' : '#333' }}>Welcome to the World of Photography by Ravi Gore!</h2>
        <p style={{ color: isDarkMode ? '#CCC' : '#555' }}>
          "Capturing moments, telling stories, and freezing time with every click. Explore breathtaking landscapes, beautiful portraits, and much more through my lens. Join me on this visual journey to discover the art of photography in its purest form."
        </p>
      </div>

      <div id="searchBarDiv">
        <SearchBar isDarkMode={isDarkMode} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <DateRangePicker
          isDarkMode={isDarkMode}
          color={isDarkMode ? undefined : "#000"}
          calendarsBackgroundColor={isDarkMode ? undefined : "#fff"}
          selectedTextColor={isDarkMode ? undefined : "#fff"}
          dayBackgroundColor={isDarkMode ? undefined : "#f0f0f0"}
          hoverBackgroundColor={isDarkMode ? undefined : "#ddd"}
          calendarWeekDayBackgroundColor={isDarkMode ? undefined : "#e0e0e0"}
          ApplyDateRangeFilter={ApplyDateRangeFilter}
        />
      </div>

      <div className="home-page-card-container">
        {filteredAssets.map((filteredAsset, index) => (
          <HomePageCard
            key={index}
            imageUrl={filteredAsset.imageUrl}
            customerName={filteredAsset.customerName}
            location={filteredAsset.location}
            date={filteredAsset.date}
            cost={`₹ ${filteredAsset.cost.toFixed(2)}`}
            onDetailsClick={() => navigate(`/gallery/${filteredAsset.groupId}`)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
