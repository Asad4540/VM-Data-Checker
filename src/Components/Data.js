import React, { useState, useEffect } from 'react';
import '../Pages/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FiUsers } from 'react-icons/fi';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import DatePickerDropdown from './DatePickerDropdown ';
import { IoCalendarNumber } from 'react-icons/io5';
import { IoMdDownload } from "react-icons/io";

const Data = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Fetch data from your API on component mount
        fetch("http://localhost:3001/api/formdata")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setFilteredData(data); // Initialize filteredData with the fetched data
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleGetReport = () => {
        let filtered = data;

        if (selectedProduct) {
            filtered = filtered.filter(item => item.product.toLowerCase() === selectedProduct.toLowerCase());
        }

        if (startDate && endDate) {
            filtered = filtered.filter(item => {



                const itemDate = new Date(item.created_at);
                console.log("iteamdta>>>", itemDate);
                console.log("startdata", startDate);


                let lastDate = new Date(endDate);
                lastDate.setDate(lastDate.getDate() + 1);
                console.log("endatadataaaa>>>>", lastDate);
                return itemDate > startDate && itemDate < lastDate;

            });
        }

        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFilteredData(filtered);
    };

    return (
        <>
            <div className='ml-[270px] mt-[70px] mr-[10px]'>
                <div className='px-10'>
                    <div className="dash-content">
                        <div className="overview">
                            <form>
                                <div className="title">
                                    <FontAwesomeIcon icon={faUsers} className='text-3xl mr-1' />
                                    <span className="ml-[10px] text-3xl font-semibold">VM DATA CHECKER</span>
                                </div>
                                <div className="boxes">
                                    <div className="box box1">
                                        <FiUsers className='text-3xl' />
                                        <label htmlFor="product-dropdown" className='text-2xl font-bold mb-2'>Clients</label>
                                        <select
                                            id="product-dropdown"
                                            className='px-10 rounded-xl py-2 font-semibold'
                                            value={selectedProduct}
                                            onChange={handleProductChange}
                                        >
                                            <option value="" disabled hidden>Select Client</option>
                                            <option value="microsoft">Microsoft</option>
                                            <option value="azure">Azure</option>
                                            <option value="servicenow">ServiceNow</option>
                                            <option value="nice">Nice</option>
                                            <option value="q-flow">Q-Flow</option>
                                        </select>
                                    </div>
                                    <div className="box box2">
                                        <BsCalendar2DateFill className='text-3xl' />
                                        <label htmlFor="from-date" className='text-2xl font-bold mb-2'>From</label>
                                        <DatePickerDropdown selectedDate={startDate} onChange={setStartDate} />
                                    </div>
                                    <div className="box box3">
                                        <IoCalendarNumber className='text-3xl' />
                                        <label htmlFor="to-date" className='text-2xl font-bold mb-2'>To</label>
                                        <DatePickerDropdown selectedDate={endDate} onChange={setEndDate} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className='flex justify-center items-center mt-5'>
                            <button className='px-10 py-1 rounded-md mt-3 bg-red-500 text-gray-50 font-semibold hover:bg-red-600' onClick={handleGetReport}>
                                Get Report <IoMdDownload className='inline ml-1 text-xl' />
                            </button>
                        </div>

                        <div className="activity">
                            <div className="title">
                                <FaRegClock className='text-3xl' />
                                <span className="ml-[10px] text-3xl font-semibold">Activity</span>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error.message}</p>}
                            {!loading && !error && filteredData.length > 0 && (
                                <table className='table-auto w-full'>
                                    <thead>
                                        <tr>
                                            <th className='px-4 py-2'>Sr No.</th>
                                            <th className='px-4 py-2'>Product</th>
                                            <th className='px-4 py-2'>First Name</th>
                                            <th className='px-4 py-2'>Last Name</th>
                                            <th className='px-4 py-2'>Email</th>
                                            <th className='px-4 py-2'>Company Name</th>
                                            <th className='px-4 py-2'>Job Title</th>
                                            <th className='px-4 py-2'>Country</th>
                                            <th className='px-4 py-2'>Challenges</th>
                                            <th className='px-4 py-2'>Technology Refresh</th>
                                            <th className='px-4 py-2'>Target Environment</th>
                                            <th className='px-4 py-2'>Migration Manager</th>
                                            <th className='px-4 py-2'>Last Refresh</th>
                                            <th className='px-4 py-2'>Open Challenges</th>
                                            <th className='px-4 py-2'>Consent Checkbox</th>
                                            <th className='px-4 py-2'>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td className='border px-4 py-2'>{index + 1}</td>
                                                <td className='border px-4 py-2'>{item.product}</td>
                                                <td className='border px-4 py-2'>{item.firstName}</td>
                                                <td className='border px-4 py-2'>{item.LastName}</td>
                                                <td className='border px-4 py-2'>{item.email}</td>
                                                <td className='border px-4 py-2'>{item.companyName}</td>
                                                <td className='border px-4 py-2'>{item.jobTitle}</td>
                                                <td className='border px-4 py-2'>{item.country}</td>
                                                <td className='border px-4 py-2'>{item.challenges}</td>
                                                <td className='border px-4 py-2'>{item.technologyRefresh}</td>
                                                <td className='border px-4 py-2'>{item.targetEnvironment}</td>
                                                <td className='border px-4 py-2'>{item.migrationManager}</td>
                                                <td className='border px-4 py-2'>{item.lastRefresh}</td>
                                                <td className='border px-4 py-2'>{item.openChallenges}</td>
                                                <td className='border px-4 py-2'>{item.consentCheckbox}</td>
                                                <td className='border px-4 py-2'>{item.created_at}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {!loading && !error && filteredData.length === 0 && (
                                <p>No data found for the selected criteria.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Data;
