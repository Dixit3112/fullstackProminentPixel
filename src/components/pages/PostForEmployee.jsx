import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterEmployee() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password, firstName, phoneNo)) {
            return;
        }
        if (!isEligible(birthDate)) {
            alert("Sorry, you are not eligible for this job.");
            return;
        }

        const newEmployee = {
            firstName, lastName, primaryEmail, password, phoneNo,
            address, gender, birthDate, department, designation,
            salary, joiningDate, statusbar, role
        };

        try {
            const response = await axios.post("http://localhost:3500/api/employees", newEmployee);
            if (response.status === 200) {
                alert("Employee registered successfully!");
                resetForm();
            } else {
                alert("Failed to register employee. Please try again.");
            }
        } catch (error) {
            console.error("There was an error registering the employee:", error);
            alert("There was an error registering the employee.");
        }
    };

    const isEligible = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        const dayDifference = today.getDate() - birth.getDate();
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            return age - 1;
        }
        return age >= 18;
    };

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

    const resetForm = () => {
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

    return (
        <div className="container">
            <div className="Container">
                <div className="flex bg-green-300 flex-col items-center justify-center my-10">
                    <h1>Register Employee</h1>
                    <div className="form flex flex-col gap-2 items-center justify-center">
                        <form onSubmit={handleSubmit} method="post" className="space-y-4 p-20">
                            {/* Form Fields */}
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="firstName">First Name </label>
                                <span>:</span>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Repeat similar divs for each field like lastName, email, etc. */}
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="lastName">Last Name </label>
                                <span>:</span>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="primaryEmail">Email </label>
                                <span>:</span>
                                <input
                                    type="email"
                                    id="email"
                                    value={primaryEmail}
                                    onChange={(e) => setPrimeEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="password">Password </label>
                                <span>:</span>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="phoneNo">Phone No </label>
                                <span>:</span>
                                <input
                                    type="text"
                                    id="phoneNo"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="address">Address </label>
                                <span>:</span>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex my-2 items-center w-72 justify-between">
                                <label htmlFor="gender">Gender </label>
                                <span>:</span>
                                <div className="flex flex-col">
                                    <label className='mx-1 flex gap-1 items-center w-40'>
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
                                    <label className="mx-1 flex gap-1 items-center w-40">
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
                                    <label className="mx-1 flex gap-1 items-center w-40">
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="birthDate">Birth Date </label>
                                <span>:</span>
                                <input
                                    type="date"
                                    id="birthDate"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Similar fields for department, designation, salary, joiningDate, statusbar, role */}
                            <div className="w-full flex justify-center mt-4">
                                <button type="submit" className="bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
