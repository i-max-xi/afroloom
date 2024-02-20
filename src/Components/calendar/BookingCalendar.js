import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';

const BookingCalendar = ({ bookedDates, onDateSelect, selectedDate }) => {

  
  // const tileClassName = ({ date }) => {
  //   const isBooked = bookedDates.some(bookedDate => (

  //     date.getDate() === bookedDate.getDate()
  //   ));

  //   return isBooked ? 'booked-date' : '';
  // };

  const tileDisabled = ({ date }) => {
    const isBooked = bookedDates.some(timestamp => {
      const timestampDate = timestamp.toDate();
      return date.getDate() === timestampDate.getDate() &&
             date.getMonth() === timestampDate.getMonth() &&
             date.getFullYear() === timestampDate.getFullYear();
    });

    return isBooked;
  };

  return (
    <div>
      <Calendar
        onChange={onDateSelect}
        value={selectedDate}
        // tileClassName={tileClassName}
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default BookingCalendar;
