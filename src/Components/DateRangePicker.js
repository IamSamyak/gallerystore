import React, { useState } from "react";
import "./DateRangePicker.css";

// Utility function to generate a list of days in a month
const generateMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const DateRangePicker = ({ isDarkMode }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  // Handle date click
  const handleDateClick = (date) => {
    if (!selectedStartDate || (selectedEndDate && !selectedStartDate)) {
      // If no start date is selected, select it as the start
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Clear the end date if a new start date is selected
    } else if (selectedStartDate && !selectedEndDate) {
      // If a start date is selected and no end date, select it as the end
      if (date >= selectedStartDate) {
        setSelectedEndDate(date);
      } else {
        // If the end date is before the start date, swap them
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      }
    }
  };

  // Handle mouse hover over dates
  const handleMouseHover = (date) => {
    if (selectedStartDate && !selectedEndDate) {
      setHoveredDate(date);
    }
  };

  // Helper function to determine if the date is in the selected range
  const isDateInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  // Function to check if a day is between the selected range of dates
  const isDateBetweenRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((date) => {
          const isInRange = isDateInRange(date);
          const isStartDate = selectedStartDate && date.toDateString() === selectedStartDate.toDateString();
          const isEndDate = selectedEndDate && date.toDateString() === selectedEndDate.toDateString();
          const isHovered = selectedStartDate && !selectedEndDate && date <= hoveredDate;
          const isBetweenRange = isDateBetweenRange(date);

          return (
            <div
              key={date}
              className={`calendar-day 
                ${isInRange ? 'in-range' : ''} 
                ${isStartDate ? 'start-date' : ''} 
                ${isEndDate ? 'end-date' : ''} 
                ${isHovered ? 'hovered' : ''} 
                ${isBetweenRange ? 'range-selected' : ''}`}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => handleMouseHover(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="date-range-info">
        {selectedStartDate && selectedEndDate ? (
          <p>
            Selected Date Range: {selectedStartDate.toLocaleDateString()} to {selectedEndDate.toLocaleDateString()}
          </p>
        ) : selectedStartDate ? (
          <p>Start Date: {selectedStartDate.toLocaleDateString()}</p>
        ) : (
          <p>Select a start date</p>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
