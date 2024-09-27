import React, { useEffect, useState } from 'react'
import UserTable from './UserDataTableByShadCN-UI';
import CalendarDashModal from "./ModalEditing"
export default function HRDashboard() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employeeData'));
        const HRDepartment = JSON.parse(localStorage.getItem('loggedInUser')).department;
        const employeeDesignation = JSON.parse(localStorage.getItem('loggedInUser')).designation;
        if (storedEmployees) {
            setEmployees(storedEmployees);
            // setEmployees(storedEmployees.filter(employee => employee.department === "HR" && employee.designation === employeeDesignation && console.log("designation and department", employee.department, employee.designation, HRDepartment, employeeDesignation))) && setEmployees(storedEmployees);

        }
    }, []);

    return (
        <div className="hrDashboard">
            <div className='container Container'>
                <div className="hr p-5">
                    <h2 className='w-full text-center text-2xl font-semibold p-10'>HR Dashboard</h2>
                    <div className="mx-auto">
                        <div className="calender">
                            <CalendarDashModal />
                        </div>
                    </div>
                    <div className="employees w-full flex justify-center items-center">
                        <UserTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
