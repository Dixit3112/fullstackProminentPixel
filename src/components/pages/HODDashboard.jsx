import React, { useEffect, useState } from 'react'

export default function HODDashboard() {
    const [employee, setEmployees] = useState([]);
    // const empDepartment = JSON.parse(localStorage.getItem('loggedInUser')).department;

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employeeData'));
        const hodDepartment = JSON.parse(localStorage.getItem('loggedInUser')).department === employee.department;
        // const employeeDesignation = JSON.parse(localStorage.getItem('loggedInUser')).designation;
        console.log("employee***", JSON.parse(localStorage.getItem('loggedInUser')).department, JSON.parse(localStorage.getItem('loggedInUser')).designation)
        if (storedEmployees && hodDepartment) {
            setEmployees(storedEmployees)
        }
    }, []);

    return (
        <div className='hodDashboard flex justify-center'>
            <div className="container">
                <div className="w-full text-center flex flex-wrap flex-col gap-20">
                    {/* <h2 className="py-5 font-semibold text-2xl">HOD Dashboard of {empDepartment.department} department</h2> */}
                    <h2 className="py-5 font-semibold text-2xl">HOD Dashboard</h2>
                    <div className="departmentEmployees">
                        {
                            employee.map((employee, index) => {
                                if (employee.department === "general" || employee.department === "HR" || employee.department === "IT" || employee.department === "Finance" || employee.department === "Production" || employee.department === "Marketing" && employee.designation === "HOD") {
                                    return (
                                        <p key={index}>
                                            {/* <strong>{employee.firstName}</strong>- <i><u>{employee.primaryEmail}</u></i> - <i><b>{employee.designation}</b></i> */}
                                        </p>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
