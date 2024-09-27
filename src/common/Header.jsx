import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styleFiles/header.scss";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [logPunchIn, setLogPunchIn] = useState({
        dropdownOpen: false,
        punchInTime: null,
        punchOutTime: null,
        totalWorkTime: null,
    });
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
        // Retrieve punch times from localStorage
        const storedPunchInTime = localStorage.getItem("punchInTime");
        const storedPunchOutTime = localStorage.getItem("punchOutTime");
        const newLogPunchIn = { ...logPunchIn };
        if (storedPunchInTime) {
            newLogPunchIn.punchInTime = new Date(storedPunchInTime);
        }
        if (storedPunchOutTime) {
            newLogPunchIn.punchOutTime = new Date(storedPunchOutTime);
        }
        if (newLogPunchIn.punchInTime && newLogPunchIn.punchOutTime) {
            const totalWorkMillis = newLogPunchIn.punchOutTime - newLogPunchIn.punchInTime;
            newLogPunchIn.totalWorkTime = totalWorkMillis / 1000 / 60; // Convert to minutes
        }
        setLogPunchIn(newLogPunchIn);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        // setUser([{firstName: 'Login'}]);
        navigate('/login');
    };
    const formatTime = (date) => {
        if (!date) return 'N/A';
        return date.toLocaleTimeString();
    };
    const toggleDropdown = () => {
        setLogPunchIn(prevState => ({
            ...prevState,
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };
    return (
        <div className='Header flex items-center justify-center h-20 bg-gray-800'>
            <div className="container mx-auto px-4">
                <div className="menu pl-40 flex justify-between items-center ">
                    <a href='/' className='infoHead pl-14 text-white'>Business Management</a>
                    <a href='/' className='Logo text-white'>LOGO</a>
                    {user ? (
                        <div className='relative'>
                            <button
                                className='text-white focus:outline-none'
                                onClick={toggleDropdown}
                            >
                                {user.firstName}
                            </button>
                            {logPunchIn.dropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-[0px_5px_3px_0px_#254514] py-2 z-10'>
                                    <button
                                        onClick={() => navigate(`/employee/${user.firstName}`)}
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-xl duration-100 w-full text-left'
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-xl duration-100 w-full text-left'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href='/login' className='signIn text-white'>Sign In</a>
                    )}
                    {user && (
                        <div className="flex flex-col items-end text-white">
                            <span>Punch In Time: {formatTime(logPunchIn.punchInTime)}</span>
                            <span>Punch Out Time: {formatTime(logPunchIn.punchOutTime)}</span>
                            <span>Total Work Time: {logPunchIn.totalWorkTime ? `${logPunchIn.totalWorkTime.toFixed(2)} minutes` : 'N/A'}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}