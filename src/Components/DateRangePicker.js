import React, { useState } from "react";
import PropTypes from "prop-types";
import "./DateRangePicker.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
/*                                  #000                    #2196f3                                     #fff                           #fff                       #f0f0f0                           #ddd                                                                                                                                     #e0e0e0                                                  #e0e0e0        */
const DateRangePicker = ({ color = "#fff", backgroundColor = "#2196f3", calendarsBackgroundColor = "#1e1e1e", selectedTextColor = "#000", dayBackgroundColor = "#333333", hoverBackgroundColor = "#4c4c4c", onHoverBackgroundColorForHeadings='#4caf50', inBetweenSelectedDateRangeColor='rgb(107 186 249)', calendarWeekDayBackgroundColor='#0d0d0d' }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  const daysInMonth = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Handle date click
  const handleDateClick = (date) => {
    if (!selectedStartDate || (selectedEndDate && !selectedStartDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset end date if a new start date is chosen
    } else if (selectedStartDate && !selectedEndDate) {
      if (date >= selectedStartDate) {
        setSelectedEndDate(date);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      }
    } else if (selectedStartDate && selectedEndDate) {
      // Reset selection
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  // Handle mouse hover over dates
  const handleMouseHover = (date) => {
    if (selectedStartDate && !selectedEndDate) {
      setHoveredDate(date);
    }
  };

  // Navigate to the previous month
  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  // Handle year change
  const handleYearChange = (year) => {
    const updatedDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(updatedDate);
    setIsYearSelectorOpen(false); // Close the year selector
  };

  // Handle month change
  const handleMonthChange = (month) => {
    const updatedDate = new Date(currentDate.getFullYear(), month, 1);
    setCurrentDate(updatedDate);
    setIsMonthSelectorOpen(false); // Close the month selector
  };

  // Helper function to determine if the date is in the selected range
  const isDateInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  // Array of month names
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  // Array of year names
  const yearNames = Array.from({ length: 21 }, (_, i) => 2020 + i);

  // Array of day names
  const dayNames = [
    { short: "S", className: "sunday" },
    { short: "M", className: "" },
    { short: "T", className: "" },
    { short: "W", className: "" },
    { short: "T", className: "" },
    { short: "F", className: "" },
    { short: "S", className: "saturday" }
  ];

  // Add the following state to manage the visibility of the calendar
const [isCalendarVisible, setIsCalendarVisible] = useState(false);

return (
  <div className="date-range-picker-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width:'50%' }}>
   <div
  className="input-container"
  style={{
    display: 'flex',
    alignItems: 'center',
    maxWidth: '500px',  
    width: '100%',  
    height: '100%',
    borderRadius: '16px',
    border: '1px solid #ccc',
    borderRadius: '50px',
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5'
  }}
  onClick={() => setIsCalendarVisible(!isCalendarVisible)}
>
  <CalendarMonthIcon className="calendar-icon" style={{height:'2.5rem', width:'2.5rem'}}/>
  <span style={{ flexGrow: 1, color: '#666', padding:'10px' }}>
    {selectedStartDate && selectedEndDate
      ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}`
      : 'Select Date Range'}
  </span>
</div>

    {isCalendarVisible && (
      <div className="calendar-container" style={{ backgroundColor: calendarsBackgroundColor, marginTop: '10px', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div className="calendar-header">
          <button style={{ backgroundColor, color: selectedTextColor }} onClick={handlePreviousMonth}>&lt;</button>
          {/* <ArrowBackIosNewIcon className="backfront-icons" sx={{color,height:'1.75rem',width:'1.75rem'}} onClick={handlePreviousMonth}/> */}
          <span
            onClick={() => setIsMonthSelectorOpen(true)}
            style={{ cursor: 'pointer', color, fontSize:'1.25rem', fontWeight:'bold', borderBottom:`1px solid ${color}` }}
            // onMouseEnter={(e) => { e.target.style.backgroundColor = onHoverBackgroundColorForHeadings; }}
            // onMouseLeave={(e) => { e.target.style.backgroundColor = ''; }}
          >
            {monthNames[currentDate.getMonth()]}
          </span>
          <span
            onClick={() => setIsYearSelectorOpen(true)}
            style={{ cursor: 'pointer', color, fontSize:'1.25rem', fontWeight:'bold', borderBottom:`1px solid ${color}` }}
            // onMouseEnter={(e) => { e.target.style.backgroundColor = onHoverBackgroundColorForHeadings; }}
            // onMouseLeave={(e) => { e.target.style.backgroundColor = ''; }}
          >
            {currentDate.getFullYear()}
          </span>
          <button style={{ backgroundColor, color: selectedTextColor }} onClick={handleNextMonth}>&gt;</button>
        </div>

        {isMonthSelectorOpen && (
          <div className="month-selector-overlay">
            <div className="month-selector-container">
              <button className="close-button" onClick={() => setIsMonthSelectorOpen(false)}>×</button>
              <div className="current-month">
                {monthNames[currentDate.getMonth()]}
              </div>
              <div className="month-grid">
                {monthNames.map((month, index) => (
                  <div
                    key={index}
                    className={`month-item ${index === currentDate.getMonth() ? "selected-month" : ""}`}
                    style={{ backgroundColor: index === currentDate.getMonth() ? backgroundColor : dayBackgroundColor, color: index === currentDate.getMonth() ? selectedTextColor : '' }}
                    onMouseEnter={(e) => { if (index !== currentDate.getMonth()) e.target.style.backgroundColor = hoverBackgroundColor; }}
                    onMouseLeave={(e) => { if (index !== currentDate.getMonth()) e.target.style.backgroundColor = dayBackgroundColor; }}
                    onClick={() => handleMonthChange(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isYearSelectorOpen && (
          <div className="year-selector-overlay">
            <div className="year-selector-container">
              <button className="close-button" onClick={() => setIsYearSelectorOpen(false)}>×</button>
              <div className="current-year">
                {currentDate.getFullYear()}
              </div>
              <div className="year-grid">
                {yearNames.map((year) => (
                  <div
                    key={year}
                    className={`year-item ${year === currentDate.getFullYear() ? "selected-year" : ""}`}
                    style={{ backgroundColor: year === currentDate.getFullYear() ? backgroundColor : dayBackgroundColor, color: year === currentDate.getFullYear() ? selectedTextColor : '' }}
                    onMouseEnter={(e) => { if (year !== currentDate.getFullYear()) e.target.style.backgroundColor = hoverBackgroundColor; }}
                    onMouseLeave={(e) => { if (year !== currentDate.getFullYear()) e.target.style.backgroundColor = dayBackgroundColor; }}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="calendar-grid">
          {/* Days of the week headers */}
          {dayNames.map((day, index) => (
            <div
              key={index}
              className={`calendar-weekday ${day.className}`}
              style={{
                backgroundColor: calendarWeekDayBackgroundColor,
                color: day.className ? '' : color
              }}
            >
              {day.short}
            </div>
          ))}

          {/* Placeholder for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={index} className="calendar-day placeholder" style={{ backgroundColor: dayBackgroundColor }}></div>
          ))}

          {daysInMonth.map((date) => {
            const isStartDate = selectedStartDate && date.toDateString() === selectedStartDate.toDateString();
            const isEndDate = selectedEndDate && date.toDateString() === selectedEndDate.toDateString();
            const isInRange = isDateInRange(date);

            const dayClassName = `${date.getDay() === 0 ? "sunday" : date.getDay() === 6 ? "saturday" : ""}`;

            return (
              <div
                key={date}
                className={`calendar-day ${dayClassName} ${isStartDate ? "start-date" : ""} ${isEndDate ? "end-date" : ""} ${isInRange ? "in-range" : ""}`}
                style={{
                  backgroundColor: isStartDate || isEndDate ? backgroundColor : (isInRange ? inBetweenSelectedDateRangeColor : dayBackgroundColor),
                  color: (isStartDate || isEndDate) ? selectedTextColor : (dayClassName ? '' : color)
                }}
                onMouseEnter={(e) => {
                  handleMouseHover(date);
                  if (!isStartDate && !isEndDate && !isInRange) e.target.style.backgroundColor = hoverBackgroundColor;
                }}
                onMouseLeave={(e) => { if (!isStartDate && !isEndDate && !isInRange) e.target.style.backgroundColor = dayBackgroundColor; }}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {/* <div className="date-range-info">
          {selectedStartDate && selectedEndDate ? (
            <p>
              Selected Date Range: {selectedStartDate.toLocaleDateString()} to {selectedEndDate.toLocaleDateString()}
            </p>
          ) : selectedStartDate ? (
            <p>Start Date: {selectedStartDate.toLocaleDateString()}</p>
          ) : (
            <p>Select a start date</p>
          )}
        </div> */}
      </div>
    )}
  </div>
);
};

DateRangePicker.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  calendarsBackgroundColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  dayBackgroundColor: PropTypes.string,
  calendarWeekDayBackgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  onHoverBackgroundColorForHeadings: PropTypes.string,
  inBetweenSelectedDateRangeColor: PropTypes.string,
};

export default DateRangePicker;
