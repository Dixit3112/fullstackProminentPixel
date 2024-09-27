import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function EmployeeProfile() {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


    if (!loggedInUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <div className="Container ">
                <div className="employeeProfile h-[84.2vh] w-full text-center">
                    <h2 className='text-2xl font-bold underline decoration-dotted'>User Profile</h2>
                    <div className="box relative">
                        <div className='w-[500px] flex absolute top-[80px] left-[40%] text-center'>
                            <div className='text-center'>
                                <p className='flex gap-2'><strong className='text-left w-24'>Name</strong>: {loggedInUser.firstName}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Email</strong>: {loggedInUser.primaryEmail}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Phone No</strong>: {loggedInUser.phoneNo}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Address</strong>: {loggedInUser.address}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Gender</strong>: {loggedInUser.gender}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Birth Date</strong>: {loggedInUser.birthDate}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Department</strong>: {loggedInUser.department}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Designation</strong>: {loggedInUser.designation}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Salary</strong>: {loggedInUser.salary}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Joining Date</strong>: {loggedInUser.joiningDate}</p>
                                <p className='flex gap-2'><strong className='text-left w-24'>Status</strong>: {loggedInUser.statusbar}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

// {/* <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Name</strong>: {user.name}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Email</strong>: {user.email}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Phone No</strong>: {user.phoneNo}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Address</strong>: {user.address}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Gender</strong>: {user.gender}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Birth Date</strong>: {user.birthDate}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Department</strong>: {user.department}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Designation</strong>: {user.designation}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Salary</strong>: {user.salary}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Joining Date</strong>: {user.joiningDate}</p>
// <p className='min-w-96 pl-[500px] flex gap5'><strong className='text-left w-44'>Status</strong>: {user.statusbar}</p> */}