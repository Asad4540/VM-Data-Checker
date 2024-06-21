import React from 'react'
import '../Pages/Dashboard.css'; // Assuming you saved the CSS as Dashboard.css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FiUsers } from "react-icons/fi";
import { BiCircleThreeQuarter } from "react-icons/bi";
import { BsCalendar2Date,BsCalendar2DateFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import DatePickerDropdown from './DatePickerDropdown ';
import { IoCalendarNumber } from "react-icons/io5";

const DashComp = () => {
    return (
        <>
            <div className='ml-[270px] mt-[70px] mr-[10px] '>
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
                                        <label htmlFor="yes-no-dropdown" className='text-2xl font-bold mb-2'>Clients </label>
                                        <select className='px-10 rounded-xl py-2 font-semibold'>
                                            <option value="" disabled selected hidden>Select Client</option>
                                            <option>Microsoft</option>
                                            <option>Azure</option>
                                            <option>ServiceNow</option>
                                            <option>Nice</option>
                                            <option>Q-Flow</option>
                                        </select>
                                    </div>
                                    <div className="box box2">
                                        <BsCalendar2DateFill className='text-3xl' />
                                        <label htmlFor="yes-no-dropdown" className='text-2xl font-bold mb-2'>From</label>
                                        <DatePickerDropdown className='' />
                                    </div>
                                    <div className="box box3">
                                        <IoCalendarNumber className='text-3xl' />
                                        <label htmlFor="yes-no-dropdown" className='text-2xl font-bold mb-2'>To</label>
                                        <DatePickerDropdown className='' />
                                        {/* <select className='px-10 rounded-xl py-2 font-semibold'>
                                            <option value="" disabled selected hidden>Select Day</option>
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select> */}
                                    </div>
                                </div>
                            </form>
                        </div>


                        <div className="activity">
                            <div className="title">
                                <FaRegClock className='text-3xl' />
                                <span className="ml-[10px] text-3xl font-semibold">Activity</span>
                            </div>
                            <div className="activity-data">
                                <div className="data names">
                                    <span className="data-title">Name</span>
                                    <span className="data-list">Asad Chaudhary</span>
                                    <span className="data-list">Suraj Choughule</span>
                                    <span className="data-list">Babasaheb Bankar</span>
                                    <span className="data-list">Ravindra Thakare</span>
                                    <span className="data-list">Aniket Sawant</span>
                                    <span className="data-list">AkshayKumar Deshmukh</span>
                                    <span className="data-list">Bikash Chand</span>
                                </div>
                                <div className="data email">
                                    <span className="data-title">Email</span>
                                    <span className="data-list">AsadChaudhary@gmail.com</span>
                                    <span className="data-list">deepachand@gmail.com</span>
                                    <span className="data-list">prakashhai@gmail.com</span>
                                    <span className="data-list">manishachand@gmail.com</span>
                                    <span className="data-list">pratimashhai@gmail.com</span>
                                    <span className="data-list">manshahi@gmail.com</span>
                                    <span className="data-list">ganeshchand@gmail.com</span>
                                </div>
                                <div className="data joined">
                                    <span className="data-title">Joined</span>
                                    <span className="data-list">2022-02-12</span>
                                    <span className="data-list">2022-02-12</span>
                                    <span className="data-list">2022-02-13</span>
                                    <span className="data-list">2022-02-13</span>
                                    <span className="data-list">2022-02-14</span>
                                    <span className="data-list">2022-02-14</span>
                                    <span className="data-list">2022-02-15</span>
                                </div>
                                <div className="data type">
                                    <span className="data-title">Type</span>
                                    <span className="data-list">New</span>
                                    <span className="data-list">Member</span>
                                    <span className="data-list">Member</span>
                                    <span className="data-list">New</span>
                                    <span className="data-list">Member</span>
                                    <span className="data-list">New</span>
                                    <span className="data-list">Member</span>
                                </div>
                                <div className="data status">
                                    <span className="data-title">Status</span>
                                    <span className="data-list">Liked</span>
                                    <span className="data-list">Liked</span>
                                    <span className="data-list">Liked</span>
                                    <span className="data-list">Liked</span>
                                    <span className="data-list">Liked</span>
                                    <span className="data-list">Liked</span>
                                    <span className="data-list">Liked</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashComp;


