import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Include your custom styles if needed
import { BiLogIn } from "react-icons/bi";
import { MdLockReset } from "react-icons/md";
 
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const response = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
 
        const result = await response.json();
 
        if (result.status === 'success') {
            sessionStorage.setItem('token', result.token);
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };
 
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#080710] font-poppins">
            <div className="absolute w-[570px] h-[620px] lg:w-[430px] lg:h-[520px]">
                <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-[#1845ad] to-[#23a2f6] rounded-full left-[-80px] top-[-80px]"></div>
                <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-full right-[-80px] bottom-[-80px]"></div>
            </div>
 
            <form className="relative w-[550px] h-[620px] lg:w-[400px] lg:h-[520px] p-[20px_35px] bg-[rgba(255,255,255,0.13)] rounded-[10px] backdrop-blur-[10px] border-[2px] border-[rgba(255,255,255,0.1)] shadow-[0_0_40px_rgba(8,7,16,0.6)]" onSubmit={handleSubmit}>
                <img src="/images/logo.webp" className="mx-auto" style={{ width: '60%' }} alt="Logo" />
                <p className="text-4xl text-yellow-400 font-bold text-center mt-3">VM Data Checker</p>
                <label htmlFor="username" className="block mt-[30px] text-[16px] font-medium text-white">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" className="block w-full h-[50px] mt-2 p-[0_10px] bg-[rgba(255,255,255,0.07)] rounded-[3px] text-[14px] text-white placeholder-[#e5e5e5]" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password" className="block mt-[23px] lg:mt-[10px] text-[16px] font-medium text-white">Password</label>
                <input type="password" placeholder="Password" id="password" className="block w-full h-[50px] mt-2 p-[0_10px] bg-[rgba(255,255,255,0.07)] rounded-[3px] text-[14px] text-white placeholder-[#e5e5e5]" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="text-red-500">{error}</p>}
                <button id="btn-clickuser" type="submit" className="block w-full mt-[50px] lg:mt-[30px] py-[15px] lg:py-[12px] bg-yellow-400 text-[#080710] text-[18px] font-bold rounded-[5px] cursor-pointer hover:bg-yellow-500">
                    <BiLogIn className="inline mr-1 text-2xl" />Log In
                </button>
                <div className="flex mt-[20px] lg:mt-[20px]">
                    <div className="flex-1 font-semibold p-[15px] lg:p-[12px_0px_12px_0px] bg-[rgba(255,255,255,0.27)] text-center text-[#eaf0fb] cursor-pointer hover:bg-[rgba(255,255,255,0.47)]">
                        <MdLockReset className='text-2xl inline mr-1' />Forgot Password
                    </div>
                </div>
            </form>
        </div>
    );
};
 
export default Login;