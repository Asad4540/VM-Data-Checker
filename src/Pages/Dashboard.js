import React from 'react';
import HeaderSidebar from '../Components/HeaderSidebar';
import './Dashboard.css'; // Assuming you still need this for other styles
import DashComp from '../Components/DashComp';

const Dashboard = () => {
    return (
        <>
        <div >
            <HeaderSidebar />
            <DashComp />
        </div>
        </>
    )
};

export default Dashboard;
