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
import Pagination from './Pagination'; // Import the Pagination component
import * as XLSX from 'xlsx'; // Import xlsx library

const Data = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Set the number of items per page
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
        setCurrentPage(1); // Reset to first page after filtering
    };

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        
        // Get current date and time
        const now = new Date();
        
        // Format date and time
        const formatDate = (date) => {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = date.getFullYear();
            const hh = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            return `${dd}/${mm}/${yyyy} time:${hh}:${min}`;
        };
        
        const timestamp = formatDate(now);
        
        // Create filename with formatted timestamp
        const filename = `date:${timestamp}.xlsx`;
    
        // Save the file
        XLSX.writeFile(workbook, filename);
    };
    

    // Calculate the data to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    // Calculate total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <div className='ml-[100px] mt-[70px] mr-[10px]'>
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
                                            className='px-10 py-2 rounded-xl  font-semibold'
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
                                    <div className="box box2 relative">
                                        <BsCalendar2DateFill className='text-3xl' />
                                        <label htmlFor="from-date" className='text-2xl font-bold mb-2'>From</label>
                                        <DatePickerDropdown selectedDate={startDate} onChange={setStartDate} className="z-30" />
                                    </div>
                                    <div className="box box3 relative">
                                        <IoCalendarNumber className='text-3xl' />
                                        <label htmlFor="to-date" className='text-2xl font-bold mb-2'>To</label>
                                        <DatePickerDropdown selectedDate={endDate} onChange={setEndDate} className="z-30" />
                                    </div>
                                </div>
                            </form>
                        </div>


                        <div className='flex justify-center items-center mt-5'>
                            <button className='md:px-9 px-1 py-1 rounded-md mt-3 bg-red-500 text-gray-50 font-semibold hover:bg-red-600' onClick={handleGetReport}>
                                Fetch Online<IoMdDownload className='inline ml-1 text-xl' />
                            </button>
                        </div>


                        <div className="-mt-10">
                            <div className='flex justify-end items-center'>
                            {/* <div className="flex mt-16">
                                <FaRegClock className='text-3xl' />
                                <span className="ml-[10px] text-3xl font-semibold">Activity</span>
                            </div> */}
                            <div className='mt-16 mb-1 '>
                                <button className='px-5 py-1 rounded-md mr-5 bg-green-800 text-gray-50 font-semibold hover:bg-green-900' onClick={handleDownloadExcel}>
                                    Download Excel <IoMdDownload className='inline ml-1 text-xl' />
                                </button>
                            </div>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error.message}</p>}
                            {!loading && !error && currentData.length > 0 && (
                                <>
                                    <div className='overflow-x-auto overflow-y-auto max-h-[300px] border border-gray-300'>
                                        <table className='table-auto w-full border border-black border-1px'>
                                            <thead>
                                                <tr className='bg-blue-800 text-gray-50' >
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Sr No.</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Product</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>First Name</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Last Name</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Email</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Company Name</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Job Title</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Country</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Challenges</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Technology Refresh</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Target Environment</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Migration Manager</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Last Refresh</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Open Challenges</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Consent Checkbox</th>
                                                    <th className='px-4 py-2 border border-black border-1px sticky top-[-2px] bg-blue-800 z-10'>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((item, index) => (
                                                    <tr key={index} className='border '>
                                                        <td className='border border-black border-1px text-center'>{indexOfFirstItem + index + 1}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.product}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.firstName}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.LastName}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.email}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.companyName}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.jobTitle}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.country}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.challenges}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.technologyRefresh}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.targetEnvironment}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.migrationManager}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.lastRefresh}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.openChallenges}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.consentCheckbox}</td>
                                                        <td className='border border-black border-1px text-center p-2'>{item.created_at}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='flex justify-center items-center mt-5'>
                                        <button
                                            className='px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400'
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                                        >
                                            Previous
                                        </button>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                        <button
                                            className='px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400'
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                                        >
                                            Next
                                        </button>
                                    </div>

                                </>
                            )}
                            {!loading && !error && currentData.length === 0 && (
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
