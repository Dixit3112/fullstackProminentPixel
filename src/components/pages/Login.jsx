import React, { useState } from 'react'
import "../../styleFiles/login.scss";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [designation, setDesignation] = useState("");
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        const storeUserInfo = localStorage.getItem("employeeData");
        if (storeUserInfo) {
            const users = JSON.parse(storeUserInfo);
            console.log("storedUserInfo***", storeUserInfo)
            const user = users.find(user => user.firstName === firstName && user.password === password);
            console.log("User***", users)

            if (user) {
                console.log("Login Successful");
                alert("Login Successful");
                localStorage.setItem("user", true)
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                console.log("user***", user)
                navigate("/home")

                // navigate based on designation
                switch (user.designation) {
                    case 'Officer':
                        navigate(`/employee/${user.firstName}`);
                        break;
                    case 'Employee':
                        navigate(`/employee/${user.firstName}`);
                        break;
                    case 'Chemist':
                        navigate(`/employee/${user.firstName}`);
                        break;
                    case 'Executive':
                        navigate(`/employee/${user.firstName}`);
                        break;
                    case 'Manager':
                        navigate(`/employee/${user.firstName}`);
                        break;
                    case 'HR':
                        navigate(`/hr/${user.firstName}/dashboard`);
                        break;
                    case 'HOD':
                        navigate(`/hod/${user.firstName}/dashboard`);
                        break;
                    case 'General Manager':
                        navigate(`/gm/${user.firstName}/dashboard`);
                        break;
                    default:
                        navigate('/login');
                }
            } else {
                alert("Invalid credentials");
            }
        } else {
            alert("No user data found");
        }
    }

    return (
        <div className="loginMain">
            <div className='container'>
                <div className="loginForm py-[58px]">
                    <h2 className='text-2xl'><u>EMPLOYEE LOGIN FORM</u></h2>
                    <div className="loginBox w-96 flex flex-col  justify-between items-center">
                        <label className='py-2 labelColumn w-full items-center flex justify-between'><p className="font-semibold">UserName :</p>
                            <input type="text" placeholder="Username" className='inputInfo text-white bg-slate-600 py-4 px-3' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className='py-2 labelColumn w-full flex items-center justify-between'><p className="font-semibold">Password :</p>
                            <input type="password" placeholder="Password" className='inputInfo text-white bg-slate-600 py-4 px-3' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <div className="w-full py-2 flex items-center justify-between">
                            <label className="mb-1 font-semibold">Designation:</label>
                            <select
                                id="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                                className="data px-4 py-2 w-[280px] border text-white bg-slate-600 rounded-md focus:outline-none focus:border-blue-900"
                            >
                                <option value="">Select Designation</option>
                                <option value="General Manager">General Manager</option>
                                <option value="HOD">HOD</option>
                                <option value="Manager">Manager</option>
                                <option value="Executive">Executive</option>
                                <option value="Sr. Officer">Sr. Officer</option>
                                <option value="Officer">Officer</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>
                        <div className="pt-10 w-full flex-button flex items-center justify-between">
                            <p>Don't have an account? <a href="/signup"><u>Register</u></a></p>
                            <button onClick={handleSignIn}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

