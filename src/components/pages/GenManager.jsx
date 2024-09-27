import React, { useEffect, useState } from 'react';
import UserTable from './UserDataTableByShadCN-UI';
import { Edit2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import EmployeeDataAdd from './EmployeeDataAdd';
import EmployeeDatabase from './EmployeeDataUpdate';
// import TableForEmployeeData from '../tryingFiles/newTableTry';
// import TableForEmployeData from '../tryingFiles/xyz';

export default function GenManagerDashboard() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeData')));
    const [employeeTableData, setEmployeeTableData] = useState([]);
    const emp = JSON.parse(localStorage.getItem("loggedInUser"));
    const navigate = useNavigate()

    useEffect(() => {
        const isManager = loggedInUser.designation === 'General Manager';
        const storedEmployee = JSON.parse(localStorage.getItem('employeeData'));
        const filterEmployee = storedEmployee.filter(value => isManager || (!isManager && loggedInUser.name === value.name));
        setEmployees(filterEmployee);
    }, []);

    useEffect(() => {
        fetch("http://localhost:3500/api/employees")
            .then(res => res.json())
            .then(data => setEmployeeTableData(data))
    }, []);

    const handleEdit = async (e) => {
        navigate(`/${emp.firstName}/update-info`);
        console.log("Employees: ", employeeTableData);
        e.preventDefault();
        try {
            const employee = await axios.get('http://localhost:3500/api/employees');
            const empSalary = await axios.get('http://localhost:3500/api/salaries');
            const salary = await axios.put(`http://localhost:3500/api/employees/${employee.id}`, employee);
            console.log('Salary updated successfully:', salary);
        } catch (err) {
            console.log("Error: ", err.message);
        }
    }

    // const handleDelete = async (id) => {
    //     console.log("Employee Table Data: ", employeeTableData);
    //     if (employeeTableData.length > 0) {
    //         const employeeData = axios.get('http://localhost:3500/api/employees');
    //         console.log("employee ID: ", employeeData.data.id);
    //         axios.delete(`http://localhost:3500/api/employees/${employeeData.data.id}`)
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     alert("Employee deleted successfully!");
    //                     const updatedEmployees = employeeTableData.filter(emp => emp.id !== employeeTableData.id);
    //                     setEmployeeTableData(updatedEmployees);
    //                 }
    //             })
    //             .catch(err => {
    //                 alert("Failed to delete employee.");
    //                 console.error("Error deleting employee: ", err);
    //             });
    //     }
    // }
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3500/api/employees/${id}`);

            if (res.status === 200) {
                alert("Employee deleted successfully!");
                console.log("Deleted Data: ", res);
                // Employee delete thayi gayu che, ema thi baki employees ne filter kariye
                const updatedEmployees = employeeTableData.filter(emp => emp.id !== id);
                setEmployeeTableData(updatedEmployees);
            }
        } catch (err) {
            alert("Failed to delete employee.");
            console.error("Error deleting employee: ", err);
        }
    };

    return (
        <div className="mainDash my-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto">
                    <h2 className="text-center text-2xl text-blue-500 mb-5 underline sm:text-3xl md:text-4xl lg:text-5xl">
                        General Manager Dashboard
                    </h2>
                    <div className="Sw-full mx-auto md:max-w-[750px] lg:max-w-[1000px] z-50">
                        <UserTable />
                    </div>
                </div>
                {/* <div className="flex gap-4 justify-center max-w-[1280px] flex-wrap mt-5 mx-auto">
                    {
                        employeeTableData.map((emp, index) => {
                            return (
                                <div className="flex sm:w-1/2 md:w-1/3 lg:w-1/4" key={index}>
                                    <div className="min-w-72 border-2 border-blue-400 p-2 rounded-xl shadow-lg shadow-blue-500 relative h-56 bg-blue-300">
                                        <p className="flex justify-between text-lg font-bold"><span className='w-24 flex justify-between'>Name<span>:</span></span><span className='w-[200px] text-center'>{emp.name}</span></p>
                                        <p className='flex justify-between py-1'><span className='w-24 flex justify-between font-semibold'> Email <span>:</span></span> <span className='w-[200px] text-center'>{emp.email}</span></p>
                                        <p className='flex justify-between py-1'><span className='w-24 flex justify-between font-semibold'> Department <span>:</span></span> <span className='w-[200px] text-center'>{emp.Department?.name}</span></p>
                                        <p className='flex justify-between py-1'><span className='w-24 flex justify-between font-semibold'> Position <span>:</span></span> <span className='w-[200px] text-center'>{emp.position}</span></p>
                                        <p className='flex justify-between py-[2px]'><span className='w-24 flex justify-between font-semibold'> Salary <span>:</span></span> <span className='w-[200px] text-center'>{emp.salary.salary}</span></p>
                                        <div className="absolute bg-green-500 text-green-950 p-2 rounded-xl right-2 bottom-2">
                                            <Edit2Icon onClick={handleEdit} />
                                        </div>
                                        <div className="absolute text-2xl bg-red-500 text-red-950 p-2 rounded-xl left-2 bottom-2">
                                            <RiDeleteBinLine onClick={() => handleDelete(emp.id)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> */}
                <div className="max-w-[1280px]">
                    <EmployeeDatabase />
                </div>
                <div className="max-w-[1280px]">
                    {/* <TableForEmployeeData />
                        <TableForEmployeData /> */}
                    <EmployeeDataAdd />
                </div>
            </div>
        </div>);
};
// <Suspense fallback={<h1 className='bg-gray-600 text-white min-h-screen flex place-items-center text-5xl min-w-[500px]'>Loading...</h1>} >
// </Suspense>