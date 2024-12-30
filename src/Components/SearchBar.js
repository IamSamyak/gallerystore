import React from "react";
import SearchIcon from "@mui/icons-material/Search"; // Import MUI Search icon
import "./SearchBar.css";

const SearchBar = ({ isDarkMode, searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <div className="search-input-container" style={{ backgroundColor: isDarkMode ? '#1E1E1E' : '#F5F5F5' }}>
        <SearchIcon className="search-icon" style={{height:'2.5rem', width:'2.5rem'}}/>
        <input
          type="text"
          placeholder="Search by your event..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{color: isDarkMode ? '#FFF' : '#000',fontSize:'1.2rem'}}
        />
      </div>
    </div>
  );
};

export default SearchBar;
