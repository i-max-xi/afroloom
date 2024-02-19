// BookingCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ bookedDates, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());



  // const tileClassName = ({ date, view }) => {
  //   if (view === 'month') {
  //     const isBooked = isDateBooked(date);
  //     return isBooked ? 'booked-date' : '';
  //   }
  //   return '';
  // };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Pass the selected date to the parent component
  };

  return (
    <div>
      <h3>Select a Date for Booking</h3>
      <Calendar
        onChange={handleDateSelect}
        value={selectedDate}
        // tileClassName={tileClassName}
      />
    </div>
  );
};

export default BookingCalendar;
