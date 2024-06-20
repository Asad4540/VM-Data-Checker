import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Assuming you saved the CSS as Dashboard.css
import { UilEstate, UilUserPlus, UilChart, UilThumbsUp, UilComments, UilShare, UilSignout, UilMoon, UilBars, UilSearch, UilTachometerFastAlt, UilClockThree } from '@iconscout/react-unicons';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    const status = localStorage.getItem('status');
    if (mode === 'dark') setIsDarkMode(true);
    if (status === 'close') setIsSidebarOpen(false);
  }, []);

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('mode', !isDarkMode ? 'dark' : 'light');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    localStorage.setItem('status', !isSidebarOpen ? 'open' : 'close');
  };

  return (
    <div className={`body ${isDarkMode ? 'dark' : ''}`}>
      <nav className={`${isSidebarOpen ? '' : 'close'}`}>
        <div className="logo-name">
          <div className="logo-image mt-4">
            <img src="images/logo-black.png" style={{ width: '100%' }} alt="Logo" />
          </div>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li><a href="Dashboard.html"><UilEstate /><span className="link-name">Dashboard</span></a></li>
            <li><a href="AddClient.html"><UilUserPlus /><span className="link-name">Add Client</span></a></li>
            <li><a href="#"><UilChart /><span className="link-name">Analytics</span></a></li>
            <li><a href="#"><UilThumbsUp /><span className="link-name">Like</span></a></li>
            <li><a href="#"><UilComments /><span className="link-name">Comment</span></a></li>
            <li><a href="#"><UilShare /><span className="link-name">Share</span></a></li>
          </ul>
          <ul className="logout-mode">
            <li><a href="Login.html"><UilSignout /><span className="link-name">Logout</span></a></li>
            <li className="mode">
              <a href="#" onClick={handleModeToggle}><UilMoon /><span className="link-name">Dark Mode</span></a>
              <div className="mode-toggle" onClick={handleModeToggle}>
                <span className="switch"></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section className="dashboard">
        <div className="top">
          <UilBars className="sidebar-toggle" onClick={handleSidebarToggle} />
          <div className="search-box">
            <UilSearch />
            <input type="text" placeholder="Search here..." />
          </div>
          <img src="images/pic.png" alt="Profile" />
        </div>
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <UilTachometerFastAlt />
              <span className="text">Select Clients</span>
            </div>
            <div className="boxes">
              <div className="box box1">
                <UilThumbsUp />
                <span className="text">Total Likes</span>
                <span className="number">50,120</span>
              </div>
              <div className="box box2">
                <UilComments />
                <span className="text">Comments</span>
                <span className="number">20,120</span>
              </div>
              <div className="box box3">
                <UilShare />
                <span className="text">Total Share</span>
                <span className="number">10,120</span>
              </div>
            </div>
          </div>
          <div className="activity">
            <div className="title">
              <UilClockThree />
              <span className="text">Recent Activity</span>
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
                <span className="data-list">premshahi@gmail.com</span>
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
      </section>
    </div>
  );
};

export default Dashboard;
