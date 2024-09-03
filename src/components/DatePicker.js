import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, onDateChange }) => (
  <DatePicker selected={selectedDate} onChange={onDateChange} />
);

export default CustomDatePicker;
