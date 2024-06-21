import React from 'react'
import '../Pages/Dashboard.css'; // Assuming you saved the CSS as Dashboard.css
import { UilThumbsUp, UilComments, UilShare, UilClockThree } from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const DashComp = () => {
    return (

        <>
            <div className='ml-[270px] mt-[70px] mr-[10px]'>
                <div className='px-10 py-1'>
                    <div className="dash-content">
                        <div className="overview">
                            <form>
                                <div className="title">
                                    <FontAwesomeIcon icon={faUsers} className='text-3xl mr-1' />
                                    <span className="ml-[10px] text-3xl font-semibold">VM CLIENTS</span>
                                </div>
                                <div className="boxes">
                                    <div className="box box1">
                                        <label htmlFor="yes-no-dropdown" className='text-xl font-bold mb-2'>Client </label>
                                        <select className='px-2 py-1 font-semibold'>
                                            <option value="" disabled selected hidden>Select Client</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
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
                            </form>
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

