import React, { useState, useEffect } from 'react';

export default function PunchTime() {
    const [punching, setPunching] = useState({
        punchInTime: null,
        isPunchedIn: false,
        punchOutTime: null,
        hasPunchedOut: false,
        lunchInTime: null,
        isLunchedIn: false,
        lunchOutTime: null,
        hasTakenLunch: false,
        workingTime: 0,
    })
    useEffect(() => {
        const today = new Date().toDateString();
        // Retrieve stored punch times from local storage
        const storedPunchInTime = localStorage.getItem('punchInTime');
        const storedPunchOutTime = localStorage.getItem('punchOutTime');
        const storedLunchInTime = localStorage.getItem('lunchInTime');
        const storedLunchOutTime = localStorage.getItem('lunchOutTime');
        const storedHasTakenLunch = localStorage.getItem('hasTakenLunch');
        const storedHasPunchedOut = localStorage.getItem('hasPunchedOut');
        const storedDate = localStorage.getItem('storedDate');
        if (storedDate === today) {
            setPunching(prevState => ({
                ...prevState,
                punchInTime: storedPunchInTime ? new Date(storedPunchInTime) : null,
                punchOutTime: storedPunchOutTime ? new Date(storedPunchOutTime) : null,
                lunchInTime: storedLunchInTime ? new Date(storedLunchInTime) : null,
                lunchOutTime: storedLunchOutTime ? new Date(storedLunchOutTime) : null,
                hasTakenLunch: storedHasTakenLunch === 'true',
                hasPunchedOut: storedHasPunchedOut === 'true',
                isPunchedIn: !!storedPunchInTime && !storedPunchOutTime,
                isLunchedIn: !!storedLunchInTime && !storedLunchOutTime,
            }));
        } else {
            localStorage.setItem('storedDate', today);
        }
    }, []);
    useEffect(() => {
        if (punching.punchInTime && punching.punchOutTime) {
            const lunchTime = punching.lunchOutTime && punching.lunchInTime ? (punching.lunchOutTime - punching.lunchInTime) : 0;
            const totalWorkTime = punching.punchOutTime - punching.punchInTime - lunchTime;
            setPunching(prev => ({
                ...prev,
                workingTime: totalWorkTime / 1000 / 60 / 60, // Convert to hours
            }));
        }
    }, [punching.punchInTime, punching.punchOutTime, punching.lunchInTime, punching.lunchOutTime]);
    const handlePunchIn = () => {
        const now = new Date();
        setPunching(prev => ({
            ...prev,
            punchInTime: now,
            isPunchedIn: true,
        }));
        localStorage.setItem('punchInTime', now);
    };
    const handlePunchOut = () => {
        if (punching.hasPunchedOut) {
            alert("You are already punched out.");
            return;
        }
        const now = new Date();
        setPunching(prev => ({
            ...prev,
            punchOutTime: now,
            isPunchedIn: false,
            hasPunchedOut: true,
        }));
        localStorage.setItem('punchOutTime', now);
        localStorage.setItem('hasPunchedOut', true);
    };
    const handleLunchIn = () => {
        const now = new Date();
        if (punching.hasTakenLunch) {
            alert("You have already taken a lunch break. Please click on Lunch Out button to end your break.");
            return;
        }
        setPunching(prev => ({
            ...prev,
            lunchInTime: now,
            isLunchedIn: true,
        }));
        localStorage.setItem('lunchInTime', now);
    };
    const handleLunchOut = () => {
        const now = new Date();

        setPunching(prev => ({
            ...prev,
            lunchOutTime: now,
            isLunchedIn: false,
            hasTakenLunch: true,
        }));
        localStorage.setItem('lunchOutTime', now);
        localStorage.setItem('hasTakenLunch', true);
    };
    const isPunchInDisabled = punching.punchOutTime && new Date() - new Date(punching.punchOutTime) < 14 * 60 * 60 * 1000; // 14 hours
    const isLunchInDisabled = punching.lunchInTime && new Date() - new Date(punching.lunchOutTime) < 23 * 60 * 60 * 1000; // 23 hours
    return (
        <div className="container Container">
            <div className="flex justify-center items-center h-[87.9vh]">
                <div className="punchTime p-4 bg-white shadow-lg rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4 text-center">Punch In/Out</h2>
                    <div className="flex flex-wrap justify-center p-5 items-center gap-3 w-full">
                        <div className="flex items-center justify-center gap-4 w-full">
                            <button
                                onClick={handlePunchIn}
                                disabled={punching.isPunchedIn || isPunchInDisabled}
                                className={`py-2 px-4 rounded-xl rounded-tl-none ${punching.isPunchedIn || isPunchInDisabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-900 text-white'}`}>
                                Punch In
                            </button>
                            <button
                                onClick={handlePunchOut}
                                disabled={!punching.isPunchedIn || punching.isLunchedIn || punching.hasPunchedOut}
                                className={`py-2 px-4 rounded-xl rounded-tr-none ${!punching.isPunchedIn || punching.isLunchedIn || punching.hasPunchedOut ? 'bg-gray-400' : 'bg-green-500 duration-500 hover:bg-red-600 text-white'}`}>
                                Punch Out
                            </button>
                        </div>
                        <div className="flex gap-4 w-full items-center justify-center">
                            <button
                                onClick={handleLunchIn}
                                disabled={!punching.isPunchedIn || punching.isLunchedIn || punching.hasTakenLunch || isLunchInDisabled}
                                className={`py-2 px-[17px] rounded-xl rounded-es-none ${!punching.isPunchedIn || punching.isLunchedIn || punching.hasTakenLunch || isLunchInDisabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-900 text-white'}`}>
                                Lunch In
                            </button>
                            <button
                                onClick={handleLunchOut}
                                disabled={!punching.isLunchedIn}
                                className={`py-2 px-[17px] rounded-xl rounded-ee-none ${!punching.isLunchedIn ? 'bg-gray-400' : 'bg-green-500 duration-500 text-white hover:bg-red-600'}`}>
                                Lunch Out
                            </button>
                        </div>
                    </div>
                    <div className="text-[18px] m-4">
                        <div className="flex gap-10">
                            <div className="punch my-10">
                                <p>Punch In Time: {punching.punchInTime ? punching.punchInTime.toLocaleTimeString() : 'Not punched in'}</p>
                                <p>Punch Out Time: {punching.punchOutTime ? punching.punchOutTime.toLocaleTimeString() : 'Not punched out'}</p>
                            </div>
                            <div className="lunch my-10">
                                <p>Lunch In Time: {punching.lunchInTime ? punching.lunchInTime.toLocaleTimeString() : 'Not Lunch in'} </p>
                                <p>Lunch Out Time: {punching.lunchOutTime ? punching.lunchOutTime.toLocaleTimeString() : 'Not Lunch Out'} </p>
                            </div>
                        </div>
                        <p className='font-bold'><span>Total Working Time:</span> <span className='underline'>{punching.workingTime ? `${punching.workingTime.toFixed(2)} hours` : 'N/A'}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

