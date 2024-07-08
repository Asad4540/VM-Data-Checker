import React, { useState, useEffect } from 'react';
import '../Pages/Dashboard.css'; // Assuming you saved the CSS as Dashboard.css
import { UilEstate, UilUserPlus, UilChart, UilThumbsUp, UilComments, UilShare, UilSignout, UilMoon, UilBars } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
 
 
 
const HeaderSidebar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [username, setUsername] = useState('');
 
 
    useEffect(() => {
        const mode = localStorage.getItem('mode');
        const status = localStorage.getItem('status');
        if (mode === 'dark') setIsDarkMode(true);
        if (status === 'close') setIsSidebarOpen(false);
    }, []);
    useEffect(() => {
        const fetchUsername = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                const response = await fetch(`http://localhost:3001/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();
 
                if (result.status === 'success') {
                    setUsername(result.username);
                }
            }
        };
 
        fetchUsername();
    }, []);
 
    const handleModeToggle = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('mode', !isDarkMode ? 'dark' : 'light');
    };
 
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
        localStorage.setItem('status', !isSidebarOpen ? 'open' : 'close');
    };
 
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove the token from local storage
        // Optionally, you can redirect to the login page here if needed
    };
 
 
    return (
        <div className={`body ${isDarkMode ? 'dark' : ''} absolute z-20`}>
            <nav className={`${isSidebarOpen ? '' : 'close'}`}>
                <div className="logo-name">
                    <div className="logo-image mt-4">
                        <img src="images/logo-black.png" style={{ width: '100%' }} alt="Logo" />
                    </div>
                </div>
                <div className="menu-items">
                    <ul className="nav-links ml-6">
                        <li><Link to='/dashboard'><UilEstate className='lgs mr-2 -ml-3' /><span className="link-name">Dashboard</span></Link></li>
                        <li><Link to='/data'><UilUserPlus className='lgs mr-2 -ml-3' /><span className="link-name">Add Client</span></Link></li>
                        <li><Link to='/analytics'><UilChart className='lgs mr-2 -ml-3' /><span className="link-name">Analytics</span></Link></li>
                        <li><Link to='/like'><UilThumbsUp className='lgs mr-2 -ml-3' /><span className="link-name">Like</span></Link></li>
                        <li><Link to='/comment'><UilComments className='lgs mr-2 -ml-3' /><span className="link-name">Comment</span></Link></li>
                        <li><Link to='/share'><UilShare className='lgs mr-2 -ml-3' /><span className="link-name">Share</span></Link></li>
                    </ul>
 
                    <ul className="logout-mode ml-6">
                        <li><Link to='/' onClick={handleLogout}><UilSignout className="lgs mr-2 -ml-3" /><span className="link-name">Logout</span></Link></li>
                        <li className="mode">
                            <Link to="#" onClick={handleModeToggle}><UilMoon className="lgs mr-2 -ml-3" /><span className="link-name">Dark Mode</span></Link>
                            <div className="mode-toggle" onClick={handleModeToggle}>
                                <span className="switch"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="dashboard">
                <div className="top">
                    <UilBars className="sidebar-toggle" onClick={handleSidebarToggle} />
                    {/* <div className="search-box">
                        <UilSearch className='absolute z-10 mt-2 ml-4' />
                        <input type="text" placeholder="Search here..." className='relative' />
                    </div> */}
                    <div className="title">
                        <FontAwesomeIcon icon={faUsers} className='text-3xl mr-1 mx-auto' />
                        <span className="ml-[10px] text-3xl font-semibold mx-auto">VM DATA CHECKER</span>
                    </div>
                    <div className='flex items-center gap-1 ' >
                        {username && <p className="text-lg border border-black p-1 rounded-md ">Hi, {username}</p>}
                        <img src="images/pic.png" alt="Profile" />
                    </div>
                </div>
            </div >
        </div >
    );
};
 
export default HeaderSidebar;