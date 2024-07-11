import React, { useState, useEffect } from 'react';
import '../Pages/Dashboard.css';
import { FiUsers } from 'react-icons/fi';
import { BsCalendar2DateFill } from 'react-icons/bs';
import DatePickerDropdown from './DatePickerDropdown ';
import { IoCalendarNumber } from 'react-icons/io5';
import { IoMdDownload } from "react-icons/io";
import Pagination from './Pagination'; // Import the Pagination component
import * as XLSX from 'xlsx'; // Import xlsx library
import { UilSearch } from '@iconscout/react-unicons';

const Data = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10; // Set the number of items per page

    const apiUrls = {
        microsoft: "http://localhost:3001/microsoft/data/api/micro",
        azure: "http://localhost:3001/azure/data/api/azure",
        servicenow: "http://localhost:3001/data/api/formdata",
        nice: "http://localhost:3001/nice/api/formdata",
        qflow: "http://localhost:3001/qflow/api/formdata"
    };

    useEffect(() => {
        if (searchTerm) {
            const filtered = data.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredData(filtered);
            setCurrentPage(1);
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, data]);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleGetReport = () => {
        if (!selectedProduct) {
            setError(new Error("Please select a product."));
            return;
        }

        setLoading(true);
        setError(null);

        fetch(apiUrls[selectedProduct])
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                let filtered = data;

                if (startDate && endDate) {
                    filtered = filtered.filter(item => {
                        const itemDate = new Date(item.created_at);
                        let lastDate = new Date(endDate);
                        lastDate.setDate(lastDate.getDate() + 1);
                        return itemDate > startDate && itemDate < lastDate;
                    });
                }

                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setData(filtered);
                setFilteredData(filtered);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        const now = new Date();
        const formatDate = (date) => {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            const hh = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            return `${dd}/${mm}/${yyyy} time:${hh}:${min}`;
        };

        const timestamp = formatDate(now);
        const filename = `date:${timestamp}.xlsx`;
        XLSX.writeFile(workbook, filename);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <div className='ml-[100px] mt-[70px] mr-[10px]'>
                <div className='px-10'>
                    <div className="dash-content">
                        <div className="overview">
                            <form>
                                <div className="boxes">
                                    <div className="box box1">
                                        <FiUsers className='text-3xl' />
                                        <label htmlFor="product-dropdown" className='text-2xl font-bold mb-2'>Clients</label>
                                        <select
                                            id="product-dropdown"
                                            className='px-10 py-2 rounded-xl font-semibold'
                                            value={selectedProduct}
                                            onChange={handleProductChange}
                                        >
                                            <option value="" disabled hidden>Select Client</option>
                                            <option value="microsoft">Microsoft</option>
                                            <option value="azure">Azure</option>
                                            <option value="servicenow">ServiceNow</option>
                                            <option value="nice">Nice</option>
                                            <option value="qflow">Q-Flow</option>
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
                            <button className='md:px-9 px-1 py-2 rounded-md mt-3 bg-red-500 text-gray-50 font-semibold hover:bg-red-600' onClick={handleGetReport}>
                                Fetch Online<IoMdDownload className='inline ml-1 text-xl' />
                            </button>
                        </div>

                        <div className="-mt-10">
                            <div className='flex justify-between items-center'>
                                <div className="mt-14 mb-1">
                                    <UilSearch className='absolute z-10 mt-2 ml-4' />
                                    <input
                                        type="text"
                                        placeholder="Search Clients..."
                                        className="pl-14 px-4 py-2 md:w-[1000px] border border-black border-1 rounded"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className='mt-14 mb-1 '>
                                    <button className='px-5 py-2 rounded-md mr-5 bg-green-800 text-gray-50 font-semibold hover:bg-green-900' onClick={handleDownloadExcel}>
                                        Download Excel <IoMdDownload className='inline ml-1 text-xl' />
                                    </button>
                                </div>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error.message}</p>}
                            {!loading && !error && currentData.length > 0 && (
                                <>
                                    <div className='overflow-x-auto overflow-y-auto max-h-[320px] border border-gray-300'>
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
                                        <button style={{ cursor: "pointer" }}
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
                            {!loading && !error && currentData.length === 0 && <div className='md:mt-20'><p className='md:text-2xl font-bold text-center'>Select a client from dropdown to see available Data</p></div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Data;