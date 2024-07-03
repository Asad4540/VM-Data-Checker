import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyles.css';

const DatePickerDropdown = ({ selectedDate, onChange,className }) => {
    return (
        <div className={className}>
            <DatePicker
                id="date-picker"
                selected={selectedDate}
                onChange={onChange}
                placeholderText="Select Date"
                dateFormat="dd/MM/yyyy"
                isClearable
                showYearDropdown
                showMonthDropdown
                dropdownMode="select" 
                className='custom-datepicker-input'
            />
        </div>
    );
};

export default DatePickerDropdown;
