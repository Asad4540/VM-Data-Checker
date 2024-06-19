import React from 'react';
import '../style.css'
import { PiHouseBold } from "react-icons/pi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from 'react-router-dom';

const HeaderSidebar = () => {
    return (
        <>
            <nav>
                <div class="logo-name">
                    <div class="logo-image mt-4">
                        <img src="/images/logo-black.png" style={{ width: "100%" }} alt="" />
                    </div>
                </div>

                <div class="menu-items">
                    <ul class="nav-links" className='ml-5'>
                        <li><Link to="/dashboard">
                            <PiHouseBold className='inline mr-3 text-2xl' />
                            <span class="link-name">Dashboard</span>
                        </Link></li>
                        <li> <Link to="/addclient">
                            <AiOutlineUserAdd className='inline mr-3 text-2xl' />
                            <span class="link-name">Add Clients</span>
                        </Link></li>
                        <li><Link to="/analytics">
                            <MdOutlineAnalytics className='inline mr-3 text-2xl' />
                            <span class="link-name">Analytics</span>
                        </Link></li>
                        <li><Link to="/like">
                            <FaRegHeart className='inline mr-3 text-2xl' />
                            <span class="link-name">Like</span>
                        </Link></li>
                        <li><Link to="/Comment">
                            <FaRegComment className='inline mr-3 text-2xl' />
                            <span class="link-name">Comment</span>
                        </Link></li>
                        <li><Link to="/Share">
                            <FaRegShareSquare className='inline mr-3 text-2xl' />
                            <span class="link-name">Share</span>
                        </Link></li>
                    </ul>

                    <ul class="logout-mode">
                        <li><a href="Login.html">
                            <i class="uil uil-signout"></i>
                            <span class="link-name">Logout</span>
                        </a></li>

                        <li class="mode">
                            <a href="#">
                                <i class="uil uil-moon"></i>
                                <span class="link-name">Dark Mode</span>
                            </a>

                            <div class="mode-toggle">
                                <span class="switch"></span>
                            </div>
                        </li>
                    </ul>
                </div >
            </nav >

            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle"></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                    <img src="images/pic.png" alt="" />
                </div>
            </section >
        </>

    );
}

export default HeaderSidebar;
