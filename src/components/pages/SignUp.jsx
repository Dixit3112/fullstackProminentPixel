import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styleFiles/signup.scss";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [primaryEmail, setPrimeEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [salary, setSalary] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [statusbar, setStatusbar] = useState("");
    const [role, setRole] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    // const id = useId();

    const oldEmplpoyeeData = JSON.parse(localStorage.getItem("employeeData")) || [];
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(password, firstName, phoneNo)) {
            return;
        }
        if (!isEligible(birthDate)) {
            alert("Sorry, you are not eligible for this job.");
            // return navigate('/');
        } else {
            const newEmployee = { firstName, lastName, primaryEmail, password, phoneNo, address, gender, birthDate, department, designation, salary, joiningDate, statusbar, role };
            const updatedEmployees = [...oldEmplpoyeeData, newEmployee];
            localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
            setEmployees(updatedEmployees);
            alert("Employee registered, Successfully")
        }
        // reset form fields
        setFirstName("");
        setLastName("");
        setPrimeEmail("");
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
    };

    const isEligible = (birthDate) => {
        const birth = new Date(birthDate)
        const today = new Date()
        const age = today.getFullYear() - birth.getFullYear()
        const monthDifference = today.getMonth() - birth.getMonth()
        const dayDifference = today.getDate() - birth.getDate()
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            return age - 1;
        }
        return age >= 18
    }

    const validatePassword = (password, username, phoneNo) => {
        const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
        const letterPattern = /[a-zA-Z]/;
        const numberPattern = /[0-9]/;

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return false;
        }
        if (!specialCharacterPattern.test(password)) {
            alert("Password must contain at least one special character.");
            return false;
        }
        if (!letterPattern.test(password) || !numberPattern.test(password)) {
            alert("Password must contain both letters and numbers.");
            return false;
        }
        if (password.includes(username) || password.includes(phoneNo)) {
            alert("Password must not include the username or phone number.");
            return false;
        }
        return true;
    };

    return (
        <div className="mainSignUP min-h-screen flex items-center justify-center p-4 bg-gray-100">
            <div className="container mx-auto max-w-lg bg-white shadow-md rounded p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold mb-4">Registration Form</h3>
                    <div className="flex justify-between">
                        <label htmlFor="firstName" className="mb-1">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            placeholder='Please Enter UserName'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="lastName" className="mb-1">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            placeholder='Please Enter UserName'
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="primaryEmail" className="mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={primaryEmail}
                            placeholder='Please Enter Email'
                            onChange={(e) => setPrimeEmail(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="password" className="mb-1">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Please Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="phoneNo" className="mb-1">Phone No:</label>
                        <input
                            type="text"
                            id="phoneNo"
                            value={phoneNo}
                            placeholder='Please Enter Number'
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="address" className="mb-1">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            placeholder='Please Enter address'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="gender" className="mb-1">Gender:</label>
                        <div className="data px-4 py-2 w-72">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                Male
                            </label>
                            <label className="ml-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                Female
                            </label>
                            <label className="ml-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={gender === "Other"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                Other
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="birthDate" className="mb-1">BirthDate:</label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            placeholder='Please Enter Your Birth Date'
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="department" className="mb-1">Department:</label>
                        <select
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select Department</option>
                            <option value="General">General</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Production">Production</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="designation" className="mb-1">Designation:</label>
                        <select
                            id="designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select Designation</option>
                            <option value="General Manager">General Manager</option>
                            <option value="HOD">HOD</option>
                            <option value="Manager">Manager</option>
                            <option value="Asst. Manager">Asst. Manager</option>
                            <option value="Executive">Executive</option>
                            <option value="Sr. Officer">Sr. Officer</option>
                            <option value="Officer">Officer</option>
                            <option value="Intern">Intern</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="salary" className="mb-1">Salary:</label>
                        <input
                            type="text"
                            id="salary"
                            value={salary}
                            placeholder='Please Enter Your Current Salary'
                            onChange={(e) => setSalary(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="joiningDate" className="mb-1">Joining Date:</label>
                        <input
                            type="date"
                            id="joiningDate"
                            value={joiningDate}
                            placeholder='Please Enter Your Joining Date'
                            onChange={(e) => setJoiningDate(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="status" className="mb-1">Status:</label>
                        <select
                            id="status"
                            value={statusbar}
                            onChange={(e) => setStatusbar(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="role" className="mb-1">Role:</label>
                        <input
                            type="text"
                            id="role"
                            value={role}
                            placeholder='Please Enter Your Current Role'
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <button
                            type="submit"
                            className="max-w-32 bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
