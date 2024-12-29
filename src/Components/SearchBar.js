import React from "react";
import SearchIcon from "@mui/icons-material/Search"; // Import MUI Search icon
import "./SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <div className="search-input-container">
        <SearchIcon className="search-icon" style={{height:'2.5rem', width:'2.5rem'}}/>
        <input
          type="text"
          placeholder="Search by your event..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
