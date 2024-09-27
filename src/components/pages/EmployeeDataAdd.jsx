import React, { useState } from 'react';
import axios from 'axios';

export default function EmployeeDataAdd() {
  // Single useState for all employee fields
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    salary: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    });
  };

  // submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeData.department) {
      alert('Please select a department');
      return;
    }

    try {
      const existingDepartment = await axios.get(`http://localhost:3500/api/departments?name=${employeeData.department}`);
      console.log("Existing Depart: ", existingDepartment);
      // let departmentId = existingDepartment.data.id;
      let departmentId = null;

      if (existingDepartment.data && existingDepartment.data.length > 0) {
        const matchingDepartment = existingDepartment.data.find((dept) => dept.name === employeeData.department);
        if(matchingDepartment) {
          departmentId = matchingDepartment.id;
        } else {
          const departmentResponse = await axios.post('http://localhost:3500/api/departments', {
            name: employeeData.department
          });
        }
      } else {
        // If no departments are found, create a new one
        const departmentResponse = await axios.post('http://localhost:3500/api/departments', {
          name: employeeData.department
        });
        departmentId = departmentResponse.data.id;
      }

      const employeeResponse = await axios.post('http://localhost:3500/api/employees', {
        name: employeeData.name,
        email: employeeData.email,
        position: employeeData.designation,
        departmentId: departmentId
      });
      const employeeId = employeeResponse.data.id;

      await axios.post('http://localhost:3500/api/salaries', {
        salary: employeeData.salary,
        employeeID: employeeId
      });
      // const existingDepartment = await axios.get(`http://localhost:3500/api/departments?name=${employeeData.department}`);
      // let departmentId = null;

      // if (existingDepartment.data && existingDepartment.data.length > 0) {
      //   const matchingDepartment = existingDepartment.data.find((dept) => dept.name === employeeData.department);
      //   if (matchingDepartment) {
      //     departmentId = matchingDepartment.id;
      //   } else {
      //     // If no matching department is found, create a new one
      //     const departmentResponse = await axios.post('http://localhost:3500/api/departments', {
      //       name: employeeData.department
      //     });
      //     departmentId = departmentResponse.data.id;
      //   }
      // } else {
      //   // If no departments are found, create a new one
      //   const departmentResponse = await axios.post('http://localhost:3500/api/departments', {
      //     name: employeeData.department
      //   });
      //   departmentId = departmentResponse.data.id;
      // }
      alert('Employee data successfully added!');
      setEmployeeData({
        name: '',
        email: '',
        department: '',
        designation: '',
        salary: ''
      });
    } catch (error) {
      console.error('Error while adding employee data:', error);
    }

  };


  return (
    <div className='container'>
      <div className="Container">
        <form className='my-10' onSubmit={handleSubmit}>
          <h1 className='text-center text-4xl font-serif'>Employee Data Add</h1>
          <div className="flex flex-col items-center gap-5">
            <div className="w-[500px]">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your name..."
                value={employeeData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-[500px]">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Enter your email"
                value={employeeData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-[500px] flex gap-24">
              <label htmlFor="department" className="mb-1">Department:</label>
              <select
                name="department"
                value={employeeData.department}
                onChange={handleChange}
                required
                className="data px-4 py-1 flex justify-center w-72 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="General">General</option>
                <option value="HR">HR</option>
                <option value="Website Development">Website Development</option>
                <option value="Software Development">Software Development</option>
              </select>
            </div>
            <div className="w-[500px] flex gap-24">
              <label htmlFor="designation" className="mb-1">Designation:</label>
              <select
                name="designation"
                value={employeeData.position}
                onChange={handleChange}
                required
                className="data px-4 py-2 w-72 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Designation</option>
                <option value="General Manager">General Manager</option>
                <option value="Manager">Manager</option>
                <option value="Asst. Manager">Asst. Manager</option>
                <option value="Executive">Project Handler</option>
                <option value="Sr. Developer">Sr. Developer</option>
                <option value="Developer">Developer</option>
                <option value="Jr. Developer">Jr. Developer</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
            <div className="w-[500px]">
              <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
              <input
                name="salary"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your salary"
                value={employeeData.salary}
                onChange={handleChange}
              />
            </div>
            <div className="w-[500px] flex justify-center">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}