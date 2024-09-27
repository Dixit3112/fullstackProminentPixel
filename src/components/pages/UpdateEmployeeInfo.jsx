// // selecte employee for update
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function UpdateEmployeeInfo() {
//   const [employees, setEmployees] = useState([]);
//   const [employee, setEmployee] = useState({
//     id: '',
//     name: '',
//     email: '',
//     position: '',
//     salary: ''
//   });

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:3500/api/employees');
//         setEmployees(response.data);
//         console.log(employees);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleChange = (e) => {
//     setEmployee({ ...employee, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (e) => {
//     const selectedEmployeeId = e.target.value;
//     console.log("Employee Id: ", selectedEmployeeId);
//     const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);
//     if (selectedEmployee) {
//       setEmployee({
//         id: selectedEmployee.id,
//         name: selectedEmployee.name,
//         email: selectedEmployee.email,
//         position: selectedEmployee.position,
//         salary: selectedEmployee.salary,
//       });
//       console.log("Selected employee: ", selectedEmployee);
//     } else {
//       setEmployee({
//         id: '', 
//         name: '',
//         email: '',
//         position: '',
//         salary: ''
//       });
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (employee.id) {
//       try {
//         await handleSubmit();
//         await handleSalaryUpdate();
//         console.log('Employee and Salary updated successfully');
//       } catch (error) {
//         console.error('Error updating employee and salary:', error);
//       }
//     } else {
//       alert('Please select an employee to update.');
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3500/api/employees/${employee.id}`, employee);
//       console.log("Employee Id ", employee.id);
//       console.log('Employee updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating employee:', error);
//     }
//   };

//   const handleSalaryUpdate = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3500/api/salaries/${employee.id}`, { salary: employee.salary });
//       console.log('Salary updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating salary:', error);
//     }
//   };

//   return (
//     <div className='m-40 flex flex-col justify-center items-center gap-5'>
//       <h1 className='text-center text-3xl font-bold'>Update Information Form</h1>
//       <div className="w-[500px] bg-blue-200 p-5 rounded-xl border-2 border-blue-200 shadow-[0px_5px_25px_5px] shadow-blue-800">
//         {/* Dropdown to select employee */}
//         <div className="mb-4 flex justify-center gap-1">
//           <label htmlFor="employeeSelect" className='flex'>Select Employee:</label>
//           <select id="employeeSelect" onChange={handleSelectChange} value={employee.id} className='bg-transparent w-60'>
//             <option value="">Select an employee</option>
//             {employees.map(emp => (
//               <option key={emp.id} value={emp.id}>{emp.name}</option>
//             ))}
//           </select>
//         </div>
//         {/* Form to update employee info */}
//         <form onSubmit={handleFormSubmit}>
//           <div className="flex justify-center gap-5">
//             <label htmlFor="name" className='flex w-[90px] justify-between'>Name<span>:</span></label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={employee.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               className='bg-transparent w-60'
//             />
//           </div>
//           <div className="flex justify-center gap-5">
//             <label htmlFor="email" className='flex w-[90px] justify-between'>Email<span>:</span></label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={employee.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className='bg-transparent w-60'
//             />
//           </div>
//           <div className="flex justify-center gap-5">
//             <label htmlFor="position" className='flex w-[90px] justify-between'>Position<span>:</span></label>
//             <input
//               type="text"
//               id="position"
//               name="position"
//               value={employee.position}
//               onChange={handleChange}
//               placeholder="Enter your latest position"
//               className='bg-transparent w-60'
//             />
//           </div>
//           <div className="flex justify-center gap-5">
//             <label htmlFor="salary" className='flex w-[90px] justify-between'>Salary<span>:</span></label>
//             <input
//               type="number"
//               id="salary"
//               name="salary"
//               value={employee.salary}
//               onChange={handleChange}
//               placeholder="Enter your latest salary"
//               className='bg-transparent w-60'
//             />
//           </div>
//           <div className="flex justify-center pt-3">
//             <button
//               type="submit"
//               className='bg-blue-500 hover:bg-blue-900 hover:text-blue-100 duration-500 text-blue-950 w-20 font-semibold rounded-full p-[1px_5px_2px_5px] text-xl flex items-center'
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateEmployeeInfo() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    salary: ''
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    const selectedEmployeeId = e.target.value;
    const selectedEmployee = employees.find(emp => emp.id.toString() === selectedEmployeeId);
    
    if (selectedEmployee) {
      setEmployee({
        id: selectedEmployee.id,
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        position: selectedEmployee.position,
        salary: selectedEmployee.salary,
      });
      console.log('Selected Employee:', selectedEmployee); // Debugging
    } else {
      setEmployee({
        id: '', 
        name: '',
        email: '',
        position: '',
        salary: ''
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (employee.id) {
      try {
        await handleSubmit();
        await handleSalaryUpdate();
        console.log('Employee and Salary updated successfully');
      } catch (error) {
        console.error('Error updating employee and salary:', error);
      }
    } else {
      alert('Please select an employee to update.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3500/api/employees/${employee.id}`, employee);
      console.log('Employee updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleSalaryUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3500/api/salaries/${employee.id}`, { salary: employee.salary });
      console.log('Salary updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  return (
    <div className='m-40 flex flex-col justify-center items-center gap-5'>
      <h1 className='text-center text-3xl font-bold'>Update Information Form</h1>
      <div className="w-[500px] bg-blue-200 p-5 rounded-xl border-2 border-blue-200 shadow-[0px_5px_25px_5px] shadow-blue-800">
        {/* Dropdown to select employee */}
        <div className="mb-4 flex justify-center gap-1">
          <label htmlFor="employeeSelect" className='flex'>Select Employee:</label>
          <select id="employeeSelect" onChange={handleSelectChange} value={employee.id} className='bg-transparent w-60'>
            <option value="">Select an employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        {/* Form to update employee info */}
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-center gap-5">
            <label htmlFor="name" className='flex w-[90px] justify-between'>Name<span>:</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className='bg-transparent w-60'
            />
          </div>
          <div className="flex justify-center gap-5">
            <label htmlFor="email" className='flex w-[90px] justify-between'>Email<span>:</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className='bg-transparent w-60'
            />
          </div>
          <div className="flex justify-center gap-5">
            <label htmlFor="position" className='flex w-[90px] justify-between'>Position<span>:</span></label>
            <input
              type="text"
              id="position"
              name="position"
              value={employee.position}
              onChange={handleChange}
              placeholder="Enter your latest position"
              className='bg-transparent w-60'
            />
          </div>
          <div className="flex justify-center gap-5">
            <label htmlFor="salary" className='flex w-[90px] justify-between'>Salary<span>:</span></label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              placeholder="Enter your latest salary"
              className='bg-transparent w-60'
            />
          </div>
          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className='bg-blue-500 hover:bg-blue-900 hover:text-blue-100 duration-500 text-blue-950 w-20 font-semibold rounded-full p-[1px_5px_2px_5px] text-xl flex items-center'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
