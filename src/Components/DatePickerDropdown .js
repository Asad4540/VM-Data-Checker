import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyles.css'

const DatePickerDropdown = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>

            <DatePicker
                id="date-picker"
                selected={selectedDate}
                onChange={handleChange}
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
