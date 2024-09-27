import React, { useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./signup.scss";

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [department, setDepartment] = useState("")
    const [designation, setDesignation] = useState("")
    const [salary, setSalary] = useState("")
    const [joiningDate, setJoiningDate] = useState("")
    const [statusbar, setStatusbar] = useState("")
    const [role, setRole] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();
    const id = useId();

    const handleSubmit = (e) => {
        e.preventDefault();

        const oldEmplpoyeeData = JSON.parse(localStorage.getItem("employeeData")) || [];
        const newEmployee = { name, email, password, phoneNo, address, gender, birthDate, department, designation, salary, joiningDate, statusbar, role };

        const updatedEmployees = [...oldEmplpoyeeData, newEmployee]

        localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        // console.log("userData****", userData)
        setName("");
        setEmail("");
        setPassword("");
        setDepartment("");
        setDesignation("");
        setSalary("");
        setGender("");
        setJoiningDate("");
        setStatusbar("");
        setBirthDate("");
        setRole("");
        setAddress("");
        setPhoneNo("");
    }

    return (
        <div className='mainSignUP'>
            <div className="Container container">
                <form onSubmit={handleSubmit} className="formPage">
                    <h3>Registration Form</h3>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="username" className="block">
                            Employee Name:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={name}
                            placeholder='Please Enter UserName'
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="email" className="block ">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Please Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="password" className="block">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Please Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="phoneNo" className="block">
                            Phone No:
                        </label>
                        <input
                            type="text"
                            id="phoneNo"
                            value={phoneNo}
                            placeholder='Please Enter Number'
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="address" className="block">
                            Address:
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            placeholder='Please Enter address'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="gender" className="block">
                            Gender:
                        </label>
                        <input
                            type="text"
                            id="gender"
                            value={gender}
                            placeholder='Please Enter Your Gender'
                            onChange={(e) => setGender(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="birthDate" className="block">
                            BirthDate:
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            placeholder='Please Enter Your Birth Date'
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-between items-center ">
                        <label htmlFor="department" className="block">
                            Department:
                        </label>
                        <div className="flex w-full justify-center">
                            <select name="department" value="department" id="department">
                                <option value="general">General</option>
                                <option value="production">Production</option>
                                <option value="quality analysis">Quality Analysis</option>
                                <option value="hr">HR</option>
                                <option value="maintanance">Maintanance</option>
                            </select>
                        </div>
                        {/* <input
                            type="text"
                            id="department"
                            value={department}
                            placeholder='Please Enter Your Department'
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        /> */}
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="designation" className="block">
                            Designation:
                        </label>
                        <div className="flex w-full justify-center">
                            <select name="designation" id="designation" value="desabled">Select Designation
                                <option value="General Manager">General Manager</option>
                                <option value="HOD">HOD</option>
                                <option value="HR">Manager</option>
                                <option value="HR Manager">HR Manager</option>
                                <option value="Executive">Executive</option>
                            </select>
                        </div>
                        {/* <input
                            type="text"
                            id="designation"
                            value={designation}
                            placeholder='Please Enter Your Designation'
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        /> */}
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="salary" className="block">
                            Salary:
                        </label>
                        <input
                            type="text"
                            id="salary"
                            value={salary}
                            placeholder='Please Enter Your Current Salary'
                            onChange={(e) => setSalary(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="joiningDate" className="block">
                            JoiningDate:
                        </label>
                        <input
                            type="date"
                            id="joiningDate"
                            value={joiningDate}
                            placeholder='Please Enter Your Joining Date'
                            onChange={(e) => setJoiningDate(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="status" className="block">
                            Status:
                        </label>
                        <input
                            type="text"
                            id="status"
                            value={statusbar}
                            placeholder='Please Enter Your Status'
                            onChange={(e) => setStatusbar(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 justify-center items-center ">
                        <label htmlFor="role" className="block">
                            Role:
                        </label>
                        <input
                            type="text"
                            id="role"
                            value={role}
                            placeholder='Please Enter Your Current Role'
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="data w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full justify-center items-center signUpButton">
                        <button
                            type="submit"
                            className="max-w-32 mx-auto bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <h2>Stored Employees</h2>
                    <div>
                        {employees.map((employee, index) => (
                            <p key={index}>
                                {employee.name} - {employee.email} - {employee.position}
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}