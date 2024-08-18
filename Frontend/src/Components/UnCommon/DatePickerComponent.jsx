import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ isRoundTrip = false }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //   const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!isRoundTrip) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      {/* <div>
        <label>
          <input
            type="radio"
            value="oneWay"
            checked={!isRoundTrip}
            onChange={() => setIsRoundTrip(false)}
          />
          One Way
        </label>
        <label>
          <input
            type="radio"
            value="roundTrip"
            checked={isRoundTrip}
            onChange={() => setIsRoundTrip(true)}
          />
          Round Trip
        </label>
      </div> */}
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Select departure date"
          inline
        />
        {isRoundTrip && (
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select return date"
            inline
          />
        )}
      </div>
    </div>
  );
};

export default DatePickerComponent;
