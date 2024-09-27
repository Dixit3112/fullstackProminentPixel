// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { Table, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { TableBody, TextField, Button } from '@mui/material';
// import axios from 'axios';
// import { DeleteIcon, Edit2Icon } from 'lucide-react';
// import LoadingDots from '../loading/Loading';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Modal = lazy(() =>
//   wait(5000)
//     .then(() => import('@mui/material'))
//     .then((module) => ({ default: module.Modal }))
// );

// const SaveButton = lazy(() =>
//   wait(2000)
//     .then(() => import('@mui/material'))
//     .then((module) => ({ defalt: module.Button }))
// );

// const wait = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   });
// };

// export default function EmployeeDatabase() {
//   const [employee, setEmployee] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isModalLoading, setIsModalLoading] = useState(false);

//   const fetchEmployeeData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3500/api/employees');
//       setEmployee(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.log("Error: ", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchEmployeeData();
//   }, []);

//   const handleEditClick = (emp) => {
//     setSelectedEmployee({
//       ...emp,
//       departmentId: emp.Department?.id || '',
//       departmentName: emp.Department?.name || '',
//       salary: emp.salary?.salary || '',
//     });

//     setIsModalLoading(true); // Set modal loading to true

//     setTimeout(() => {
//       setIsModalLoading(false); // Set modal loading to false
//       setEditModalOpen(true);
//     }, 2000); // Simulate loading time
//   };

//   const handleDeleteClick = async (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await axios.delete(`http://localhost:3500/api/employees/${id}`);
//         fetchEmployeeData();
//         toast.success("Employee deleted successfully");
//       } catch (error) {
//         console.error("Error deleting employee: ", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'department') {
//       setSelectedEmployee({ ...selectedEmployee, departmentName: value });
//     } else {
//       setSelectedEmployee({ ...selectedEmployee, [name]: value });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const updatedEmployeeData = {
//         name: selectedEmployee.name,
//         email: selectedEmployee.email,
//         position: selectedEmployee.position,
//         salary: selectedEmployee.salary,
//       };

//       await axios.put(`http://localhost:3500/api/employees/${selectedEmployee.id}`, updatedEmployeeData);

//       const updatedSalary = {
//         salary: selectedEmployee.salary,
//       };
//       await axios.put(`http://localhost:3500/api/salaries/${selectedEmployee.id}`, updatedSalary);

//       const updatedDepartment = {
//         name: selectedEmployee.departmentName,
//       };

//       await axios.put(`http://localhost:3500/api/departments/${selectedEmployee.departmentId}`, updatedDepartment);

//       setEditModalOpen(false);
//       fetchEmployeeData();

//       toast.success('Employee data edited successfully!');
//     } catch (error) {
//       console.error("Error updating employee: ", error.response?.data || error.message);
//       toast.error('Error updating employee data.');
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       {loading ? (
//         <LoadingDots /> // Ensure the loading dots display properly while data is being fetched
//       ) : (
//         <div className="container my-10">
//           <div className='Container flex justify-center flex-col items-center'>
//             <h3 className='text-4xl font-serif font-semibold'>Employee Database Data</h3>
//             <div className="flex justify-center items-center font-semibold text-5">
//               <Table className="bg-green-100 rounded-2xl w-[850px] h-80">
//                 <TableHeader className='rounded-2xl'>
//                   <TableRow className='rounded-2xl text-center w-full'>
//                     <TableHead className='rounded-2xl text-center w-44'>ID</TableHead>
//                     <TableHead className='rounded-2xl text-center w-44'>Name</TableHead>
//                     <TableHead className='rounded-2xl text-center w-44'>Email</TableHead>
//                     <TableHead className='rounded-2xl text-center w-44'>Position</TableHead>
//                     <TableHead className='rounded-2xl text-center w-44'>Department</TableHead>
//                     <TableHead className='rounded-2xl text-center w-44'>Salary</TableHead>
//                     <TableHead className='rounded-2xl text-center w-44'>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {employee.length > 0 ? employee.map((emp, index) => (
//                     <TableRow key={index}>
//                       <TableCell className='rounded-2xl text-center w-44'>{emp.id}</TableCell>
//                       <TableCell className='rounded-2xl text-center w-44'>{emp.name}</TableCell>
//                       <TableCell className='rounded-2xl text-center w-44'>{emp.email}</TableCell>
//                       <TableCell className='rounded-2xl text-center w-44'>{emp.position}</TableCell>
//                       <TableCell className='rounded-2xl text-center w-44'>{emp.Department?.name}</TableCell>
//                       <TableCell className='rounded-2xl text-center w-44'>{emp.salary?.salary}</TableCell>
//                       <TableCell className='rounded-2xl text-center w-44'>
//                         <div className="flex justify-center items-center gap-10">
//                           <Suspense fallback={<LoadingDots />}>
//                             <Edit2Icon className='text-2xl text-blue-600 cursor-pointer' onClick={() => handleEditClick(emp)} />
//                           </Suspense>
//                           <DeleteIcon className='text-2xl text-red-600 cursor-pointer' onClick={() => handleDeleteClick(emp.id)} />
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow>
//                       <TableCell colSpan={7} className="text-center">No Employee Data Available</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//           <Suspense fallback={<LoadingDots />}>
//             {editModalOpen && (
//               <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//                 {isModalLoading ? (
//                   <LoadingDots />
//                 ) : (
//                   <div className="bg-white p-6 rounded-md flex flex-col gap-4 w-[400px] mx-auto mt-20">
//                     <h2 className="text-xl font-bold">Edit Employee</h2>
//                     <TextField
//                       label="Name"
//                       name="name"
//                       value={selectedEmployee.name || ''}
//                       onChange={handleInputChange}
//                       fullWidth
//                     />
//                     <TextField
//                       label="Email"
//                       name="email"
//                       value={selectedEmployee.email || ''}
//                       onChange={handleInputChange}
//                       fullWidth
//                     />
//                     <TextField
//                       label="Position"
//                       name="position"
//                       value={selectedEmployee.position || ''}
//                       onChange={handleInputChange}
//                       fullWidth
//                     />
//                     <TextField
//                       label="Department"
//                       name="department"
//                       value={selectedEmployee.departmentName || ''}
//                       onChange={handleInputChange}
//                       fullWidth
//                     />
//                     <TextField
//                       label="Salary"
//                       name="salary"
//                       value={selectedEmployee.salary || ''}
//                       onChange={handleInputChange}
//                       fullWidth
//                     />
//                     <div className="flex gap-2 mt-4">
//                       <Button variant="contained" color="primary" onClick={handleSave}>
//                         <Suspense fallback={<LoadingDots />}>
//                           <SaveButton>
//                             Save
//                           </SaveButton>
//                         </Suspense>
//                       </Button>
//                       <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)}>Cancel</Button>
//                     </div>
//                   </div>
//                 )}
//               </Modal>
//             )}
//           </Suspense>
//         </div>
//       )}
//     </>
//   );
// }

// ----------------------------------------upper code is for lazy loading try--------------

// import React, { useState, useEffect } from 'react'
// import { Table, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { TableBody, Modal, TextField, Button } from '@mui/material'
// import axios from 'axios';
// import { DeleteIcon, Edit2Icon } from 'lucide-react';

// export default function EmployeeDatabase() {
//   const [employee, setEmployee] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState({});

//   const fetchEmployeeData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3500/api/employees');
//       setEmployee(response.data);
//       console.log("Employee Data: ", response.data);
//     } catch (error) {
//       console.log("Error: ", error.message);
//     }
//   }

//   useEffect(() => {
//     fetchEmployeeData();
//   }, []);

//   const handleEditClick = (emp) => {
//     setSelectedEmployee({
//       ...emp,
//       departmentId: emp.Department.id || '',
//       departmentName: emp.Department?.name || '',
//       salary: emp.salary?.salary || '',
//     });
//     setEditModalOpen(true);
//   };

//   const handleDeleteClick = async (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await axios.delete(`http://localhost:3500/api/employees/${id}`);
//         fetchEmployeeData();
//         alert("Employee deleted successfully");
//       } catch (error) {
//         console.error("Error deleting employee: ", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if(name === 'department') {
//       setSelectedEmployee({ ...selectedEmployee, departmentName: value });
//     } else {
//       setSelectedEmployee({ ...selectedEmployee, [name]: value });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const updatedEmployeeData = {
//         name: selectedEmployee.name,
//         email: selectedEmployee.email,
//         position: selectedEmployee.position,
//         department: {
//           id: selectedEmployee.departmentId,
//           name: selectedEmployee.departmentName,
//         },
//         salary: selectedEmployee.salary,
//       };

//       await axios.put(`http://localhost:3500/api/employees/${selectedEmployee.id}`, updatedEmployeeData);
//       // const department = await axios.get('http://localhost:3500/api/departments');
//       // console.log("first", department);
//       // // const updatedSalary = {
//       // //   salary: selectedEmployee.salary,
//       // // };
//       // // await axios.put(`http://localhost:3500/api/salaries/${selectedEmployee.id}`, updatedSalary);

//       const updatedDepartment = { 
//         id: selectedEmployee.departmentId,
//         name: selectedEmployee.departmentName,
//       };
//       await axios.put(`http://localhost:3500/api/departments/${selectedEmployee.departmentId}`, updatedDepartment);

//       console.log("Updated Employee data: ", updatedEmployeeData);
//       setEditModalOpen(false);
//       fetchEmployeeData();
//     } catch (error) {
//       console.error("Error updating employee: ", error.response?.data || error.message);
//     }
//   };

//   // const handleSave = async () => {
//   //   try {
//   //     const updatedEmployeeData = {
//   //       name: selectedEmployee.name,
//   //       email: selectedEmployee.email,
//   //       position: selectedEmployee.position,
//   //       department: selectedEmployee.department,
//   //       salary: selectedEmployee.salary,
//   //     };

//   //     await axios.put(`http://localhost:3500/api/employees/${selectedEmployee.id}`, updatedEmployeeData);

//   //     // Update salary data
//   //     const updatedSalary = {
//   //       salary: selectedEmployee.salary,
//   //     };
//   //     await axios.put(`http://localhost:3500/api/salaries/${selectedEmployee.id}`, updatedSalary);

//   //     console.log("Updated Employee data: ", updatedEmployeeData);
//   //     setEditModalOpen(false);
//   //     fetchEmployeeData();
//   //   } catch (error) {
//   //     console.error("Error updating employee: ", error.response?.data || error.message);
//   //   }
//   // };

//   return (
//     <>
//       <div className="container my-10">
//         <div className='container flex justify-center flex-col items-center'>
//           <h3 className='text-4xl font-serif font-semibold'>Employee Database Data</h3>
//           <div className="flex justify-center items-center font-semibold text-5">
//             <Table className="bg-green-100 rounded-2xl w-[850px] h-80">
//               <TableHeader className='rounded-2xl'>
//                 <TableRow className='rounded-2xl text-center w-full'>
//                   <TableHead className='rounded-2xl text-center w-44'>ID</TableHead>
//                   <TableHead className='rounded-2xl text-center w-44'>Name</TableHead>
//                   <TableHead className='rounded-2xl text-center w-44'>Email</TableHead>
//                   <TableHead className='rounded-2xl text-center w-44'>Position</TableHead>
//                   <TableHead className='rounded-2xl text-center w-44'>Department</TableHead>
//                   <TableHead className='rounded-2xl text-center w-44'>Salary</TableHead>
//                   <TableHead className='rounded-2xl text-center w-44'>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {
//                   employee.length > 0 ? employee.map((emp, index) => {
//                     return (
//                       <TableRow key={index}>
//                         <TableCell className='rounded-2xl text-center w-44'>{emp.id}</TableCell>
//                         <TableCell className='rounded-2xl text-center w-44'>{emp.name}</TableCell>
//                         <TableCell className='rounded-2xl text-center w-44'>{emp.email}</TableCell>
//                         <TableCell className='rounded-2xl text-center w-44'>{emp.position}</TableCell>
//                         <TableCell className='rounded-2xl text-center w-44'>{emp.Department?.name}</TableCell>
//                         <TableCell className='rounded-2xl text-center w-44'>{emp.salary?.salary}</TableCell>
//                         <TableCell className='rounded-2xl text-center w-44'>
//                           <div className="flex justify-center items-center gap-10">
//                             <Edit2Icon className='text-2xl text-blue-600 cursor-pointer' onClick={() => handleEditClick(emp)} />
//                             <DeleteIcon className='text-2xl text-red-600 cursor-pointer' onClick={() => handleDeleteClick(emp.id)} />
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     )
//                   })
//                     :
//                     <TableRow>
//                       <TableCell colSpan={7} className="text-center">No Employee Data Available</TableCell>
//                     </TableRow>
//                 }
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>
//       {/* Edit Employee Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <div className="bg-white p-6 rounded-md flex flex-col gap-4 w-[400px] mx-auto mt-20">
//           <h2 className="text-xl font-bold">Edit Employee</h2>
//           <TextField
//             label="Name"
//             name="name"
//             value={selectedEmployee.name || ''}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={selectedEmployee.email || ''}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             label="Position"
//             name="position"
//             value={selectedEmployee.position || ''}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             label="Department"
//             name="department"
//             value={selectedEmployee.departmentName || ''}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             label="Salary"
//             name="salary"
//             value={selectedEmployee.salary || ''}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <div className="flex gap-2 mt-4">
//             <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
//             <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)}>Cancel</Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   )
// }

// _____________________________________________________________________________________________

//Headers
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../styleFiles/header.scss";

// export default function Header() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [logPunchIn, setLogPunchIn] = useState({
//         dropdownOpen: false,
//         punchInTime: null,
//         punchOutTime: null,
//         totalWorkTime: null,
//     });

//     useEffect(() => {
//         const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//         if (loggedInUser) {
//             setUser(loggedInUser);
//             console.log("loginUser", setUser(loggedInUser))
//             // localStorage.setItem('user', true);
//         }

//         // Retrieve punch times from localStorage
//         const storedPunchInTime = localStorage.getItem("punchInTime");
//         const storedPunchOutTime = localStorage.getItem("punchOutTime");

//         const newLogPunchIn = { ...logPunchIn };

//         if (storedPunchInTime) {
//             newLogPunchIn.punchInTime = new Date(storedPunchInTime);
//         }
//         if (storedPunchOutTime) {
//             newLogPunchIn.punchOutTime = new Date(storedPunchOutTime);
//         }

//         // Calculate total working time
//         if (newLogPunchIn.punchInTime && newLogPunchIn.punchOutTime) {
//             const totalWorkMillis = newLogPunchIn.punchOutTime - newLogPunchIn.punchInTime;
//             newLogPunchIn.totalWorkTime = totalWorkMillis / 1000 / 60; // Convert to minutes
//         }

//         setLogPunchIn(newLogPunchIn);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('loggedInUser');
//         setUser(null);
//         navigate('/login');
//     };

//     const formatTime = (date) => {
//         if (!date) return 'N/A';
//         return date.toLocaleTimeString();
//     };

//     const toggleDropdown = () => {
//         setLogPunchIn(prevState => ({
//             ...prevState,
//             dropdownOpen: !prevState.dropdownOpen,
//         }));
//     };

//     return (
//         <div className='Header flex items-center justify-center h-20 bg-gray-800'>
//             <div className="container mx-auto px-4">
//                 <div className="menu pl-40 flex justify-between items-center ">
//                     <a href='/management' className='infoHead pl-14 text-white'>Business Management</a>
//                     <a href='/' className='Logo text-white'>LOGO</a>
//                     {user ? (
//                         <div className='relative'>
//                             <button
//                                 className='text-white focus:outline-none'
//                                 onClick={toggleDropdown}
//                             >
//                                 {user.firstName}
//                             </button>
//                             {logPunchIn.dropdownOpen && (
//                                 <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50'>
//                                     <button
//                                         onClick={navigate('/employee/profile')}
//                                         className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'
//                                     >
//                                         Veiw Profile
//                                     </button>
//                                     <button
//                                         onClick={handleLogout}
//                                         className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'
//                                     >
//                                         Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <a href='/login' className='signIn text-white'>Sign In</a>
//                     )}
//                     {user && (
//                         <div className="flex flex-col items-end text-white">
//                             <span>Punch In Time: {formatTime(logPunchIn.punchInTime)}</span>
//                             <span>Punch Out Time: {formatTime(logPunchIn.punchOutTime)}</span>
//                             <span>Total Work Time: {logPunchIn.totalWorkTime ? `${logPunchIn.totalWorkTime.toFixed(2)} minutes` : 'N/A'}</span>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


// ______________________________________________________________________
// It is one for edit delete of projects and demployees' detail.

// project edit, delete, veiw done.

// import { Button, Checkbox } from '@mui/material';
// import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// export default function ProjectFile() {
//     const [project, setProject] = useState(() => {
//         const storedProjects = localStorage.getItem('Projects');
//         return {
//             availableProject: storedProjects ? JSON.parse(storedProjects) : [],
//             doneProjects: [],
//             newProject: '',
//             newProjectDescription: '',
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//             modalOpen: true,
//             selectedProject: null,
//             selectedProjectsForMove: [],
//             selectedDoneProjectsForMove: [],
//             actionCheckboxes: {},
//         };
//     });

//     useEffect(() => {
//         localStorage.setItem('Projects', JSON.stringify(project.availableProject));
//     }, [project.availableProject]);

//     const handleCheckboxChange = (projectToToggle, isDoneProject) => {
//         setProject((prevProject) => {
//             const selectedProjectsKey = isDoneProject ? 'selectedDoneProjectsForMove' : 'selectedProjectsForMove';
//             const isSelected = prevProject[selectedProjectsKey].some((pro) => pro.id === projectToToggle.id);
//             return {
//                 ...prevProject,
//                 [selectedProjectsKey]: isSelected
//                     ? prevProject[selectedProjectsKey].filter((pro) => pro.id !== projectToToggle.id)
//                     : [...prevProject[selectedProjectsKey], projectToToggle],
//             };
//         });
//     };

//     const handleActionCheckboxChange = (projectId, action) => {
//         setProject((prevProject) => {
//             const updatedCheckboxes = { ...prevProject.actionCheckboxes };
//             if (!updatedCheckboxes[projectId]) {
//                 updatedCheckboxes[projectId] = {};
//             }
//             updatedCheckboxes[projectId][action] = !updatedCheckboxes[projectId][action];
//             return { ...prevProject, actionCheckboxes: updatedCheckboxes };
//         });
//     };

//     const moveToDone = () => {
//         setProject((prevProject) => {
//             const selectedProjectIds = new Set(prevProject.selectedProjectsForMove.map((pro) => pro.id));
//             const newAvailableProjects = prevProject.availableProject.filter((pro) => !selectedProjectIds.has(pro.id));
//             const newDoneProjects = [
//                 ...prevProject.doneProjects,
//                 ...prevProject.availableProject.filter((pro) => selectedProjectIds.has(pro.id))
//             ];
//             return {
//                 ...prevProject,
//                 availableProject: newAvailableProjects,
//                 doneProjects: newDoneProjects,
//                 selectedProjectsForMove: [],
//             };
//         });
//     };

//     const moveToAvailable = () => {
//         setProject((prevProject) => {
//             const selectedProjectIds = new Set(prevProject.selectedDoneProjectsForMove.map((pro) => pro.id));
//             const newDoneProjects = prevProject.doneProjects.filter((pro) => !selectedProjectIds.has(pro.id));
//             const newAvailableProjects = [
//                 ...prevProject.availableProject,
//                 ...prevProject.doneProjects.filter((pro) => selectedProjectIds.has(pro.id))
//             ];
//             return {
//                 ...prevProject,
//                 availableProject: newAvailableProjects,
//                 doneProjects: newDoneProjects,
//                 selectedDoneProjectsForMove: [],
//             };
//         });
//     };

//     const handleAddProject = () => {
//         if (project.newProject.trim()) {
//             const newId = Date.now();
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: [
//                     ...prevProject.availableProject,
//                     { id: newId, title: prevProject.newProject.trim(), description: prevProject.newProjectDescription.trim() }
//                 ],
//                 newProject: '',
//                 newProjectDescription: '',
//             }));
//         }
//     };

//     const handleDeleteProject = (projectToDelete) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.filter((p) => p.id !== projectToDelete.id),
//             doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== projectToDelete.id),
//             selectedProject: prevProject.selectedProject?.id === projectToDelete.id ? null : prevProject.selectedProject,
//             selectedProjectsForMove: prevProject.selectedProjectsForMove.filter((pro) => pro.id !== projectToDelete.id),
//             selectedDoneProjectsForMove: prevProject.selectedDoneProjectsForMove.filter((pro) => pro.id !== projectToDelete.id),
//         }));
//     };

//     const handleEditProject = (projectToEdit) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             editingProject: projectToEdit,
//             editProjectTitle: projectToEdit.title,
//             editProjectDescription: projectToEdit.description,
//         }));
//     };

//     const handleSaveEdit = () => {
//         if (project.editingProject) {
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: prevProject.availableProject.map((pro) =>
//                     pro.id === prevProject.editingProject.id
//                         ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                         : pro
//                 ),
//                 doneProjects: prevProject.doneProjects.map((pro) =>
//                     pro.id === prevProject.editingProject.id
//                         ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                         : pro
//                 ),
//                 editingProject: null,
//                 editProjectTitle: '',
//                 editProjectDescription: '',
//             }));
//         }
//     };

//     const handleShowProjectDetail = (proj) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             selectedProject: proj,
//         }));
//     };

//     const handleCloseModal = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             modalOpen: false,
//         }));
//     };

//     return (
//         <>
//             <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-[22] bg-opacity-80 absolute top-0 ${project.modalOpen ? '' : 'hidden'}`}>
//                 <div className='w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl relative'>
//                     <h2 className="text-2xl font-bold mb-2 text-center">Project Details</h2>
//                     <div className="flex flex-wrap justify-between max-w-xl">
//                         <div className="w-1/2 p-1">
//                             <h3 className="text-xl text-center font-semibold mb-2">Available Projects</h3>
//                             {project.availableProject.map((proj, ind) => (
//                                 <div key={ind} className="flex flex-col mb-2 pb-2">
//                                     <div className="flex items-center mb-2">
//                                         <Checkbox
//                                             checked={project.selectedProjectsForMove.some((p) => p.id === proj.id)}
//                                             onChange={() => handleCheckboxChange(proj, false)}
//                                         />
//                                         <span className="flex-1">{proj.title}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="flex justify-center item-center">
//                                 <Button onClick={moveToDone} variant='contained'>Move</Button>
//                             </div>
//                         </div>
//                         <div className="w-1/2 p-2">
//                             <h3 className="text-xl text-center font-semibold mb-2">Done Projects</h3>
//                             {project.doneProjects.map((proj, index) => (
//                                 <div key={index} className="flex flex-col mb-2 pb-2">
//                                     <div className="flex items-center mb-2">
//                                         <Checkbox
//                                             checked={project.selectedDoneProjectsForMove.some((p) => p.id === proj.id)}
//                                             onChange={() => handleCheckboxChange(proj, true)}
//                                         />
//                                         <span className="flex-1">{proj.title}</span>
//                                     </div>
//                                     {project.selectedDoneProjectsForMove.some((p) => p.id === proj.id) && (
//                                         <div className="flex gap-2 items-center">
//                                             <Checkbox
//                                                 checked={project.actionCheckboxes[proj.id]?.edit || false}
//                                                 onChange={() => {
//                                                     handleActionCheckboxChange(proj.id, 'edit');
//                                                     // handleEditProject(proj);
//                                                 }}
//                                             /> Edit
//                                             <Checkbox
//                                                 checked={project.actionCheckboxes[proj.id]?.delete || false}
//                                                 onChange={() => {
//                                                     handleActionCheckboxChange(proj.id, 'delete');
//                                                     // handleDeleteProject(proj);
//                                                 }}
//                                             /> Delete
//                                             <Checkbox
//                                                 checked={project.actionCheckboxes[proj.id]?.view || false}
//                                                 onChange={() => {
//                                                     handleActionCheckboxChange(proj.id, 'view');
//                                                     // handleShowProjectDetail(proj)
//                                                 }}
//                                             /> View
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <div className="flex justify-center item-center">
//                                 <Button onClick={moveToAvailable} variant='contained'>Back Move</Button>
//                                 <Button onClick={handleSaveEdit} variant='contained'>Save</Button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-end mt-4">
//                         <button className="absolute top-0 right-0 m-4" onClick={handleCloseModal}>
//                             <CrossIcon />
//                         </button>
//                     </div>
//                     <div className="flex flex-col items-center mt-4">
//                         <h3 className="text-xl font-semibold mb-2">Add a New Project</h3>
//                         <input
//                             type="text"
//                             value={project.newProject}
//                             onChange={(e) => setProject({ ...project, newProject: e.target.value })}
//                             placeholder="Project Title"
//                             className="p-2 border border-gray-300 rounded-md w-full mb-4"
//                         />
//                         <textarea
//                             value={project.newProjectDescription}
//                             onChange={(e) => setProject({ ...project, newProjectDescription: e.target.value })}
//                             placeholder="Project Description"
//                             className="p-2 border border-gray-300 rounded-md w-full mb-4"
//                         />
//                         <Button
//                             onClick={handleAddProject}
//                             variant='contained'
//                             startIcon={<SaveIcon />}
//                         >
//                             Add Project
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             {project.selectedProject && (
//                 <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-30'>
//                     <div className='bg-white p-6 rounded-lg shadow-lg'>
//                         <h2 className='text-2xl font-bold mb-4'>{project.selectedProject.title}</h2>
//                         <p>{project.selectedProject.description}</p>
//                         <div className='flex justify-end mt-4'>
//                             <Button
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 onClick={() => setProject((prevProject) => ({ ...prevProject, selectedProject: null }))}
//                             >
//                                 Close
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {project.editingProject && (
//                 <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-30'>
//                     <div className='bg-white p-6 rounded-lg shadow-lg'>
//                         <h3 className='text-2xl font-bold mb-4'>Edit Project</h3>
//                         <input
//                             type="text"
//                             value={project.editProjectTitle}
//                             onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectTitle: e.target.value }))}
//                             className="p-2 border border-gray-300 rounded-md w-full mb-4"
//                         />
//                         <textarea
//                             value={project.editProjectDescription}
//                             onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectDescription: e.target.value }))}
//                             className="p-2 border border-gray-300 rounded-md w-full mb-4"
//                         />
//                         <div className="flex gap-2">
//                             <Button
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 onClick={handleSaveEdit}
//                             >
//                                 Save
//                             </Button>
//                             <Button
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 onClick={() => setProject((prevProject) => ({ ...prevProject, editingProject: null }))}
//                             >
//                                 Cancel
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }


// ______________________________________________________________
// complete but some mistackes are not solved

// import { Button, Checkbox } from '@mui/material';
// import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// export default function ProjectFile() {
//     const [project, setProject] = useState(() => {
//         const storedProjects = localStorage.getItem('Projects');
//         return {
//             availableProject: storedProjects ? JSON.parse(storedProjects) : [],
//             doneProjects: [],
//             newProject: '',
//             newProjectDescription: '',
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//             modalOpen: true,
//             selectedProject: null,
//             moveCheck: false,
//         };
//     });

//     useEffect(() => {
//         localStorage.setItem('Projects', JSON.stringify(project.availableProject));
//     }, [project.availableProject]);

//     const handleCheckboxChange = (projectToToggle) => {
//         setProject((prevProject) => {
//             const isAvailable = prevProject.availableProject.some((pro) => pro.id === projectToToggle.id);
//             const newSelectedProject = isAvailable ? null : projectToToggle;
//             return {
//                 ...prevProject,
//                 availableProject: isAvailable
//                     ? prevProject.availableProject.filter((pro) => pro.id !== projectToToggle.id)
//                     : [...prevProject.availableProject, projectToToggle],
//                 doneProjects: isAvailable
//                     ? [...prevProject.doneProjects, projectToToggle]
//                     : prevProject.doneProjects.filter((pro) => pro.id !== projectToToggle.id),
//                 selectedProject: newSelectedProject,
//             };
//         });
//     };

//     const moveToAvailable = () => {
//         if (project.selectedProject) {
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: [...prevProject.availableProject, ...prevProject.doneProjects],
//                 doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== project.selectedProject.id),
//                 selectedProject: null,
//             }));
//         }
//     };

//     const handleAddProject = () => {
//         if (project.newProject.trim()) {
//             const newId = Date.now();
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: [
//                     ...prevProject.availableProject,
//                     { id: newId, title: prevProject.newProject.trim(), description: prevProject.newProjectDescription.trim() }
//                 ],
//                 newProject: '',
//                 newProjectDescription: '',
//             }));
//         }
//     };

//     const handleDeleteProject = (projectToDelete) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.filter((p) => p.id !== projectToDelete.id),
//             doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== projectToDelete.id),
//             selectedProject: prevProject.selectedProject?.id === projectToDelete.id ? null : prevProject.selectedProject,
//         }));
//     };

//     const handleEditProject = (projectToEdit) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             editingProject: projectToEdit,
//             editProjectTitle: projectToEdit.title,
//             editProjectDescription: projectToEdit.description,
//         }));
//     };

//     const handleSaveEdit = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.map((pro) =>
//                 pro.id === prevProject.editingProject.id
//                     ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                     : pro
//             ),
//             doneProjects: prevProject.doneProjects.map((pro) =>
//                 pro.id === prevProject.editingProject.id
//                     ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                     : pro
//             ),
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//         }));
//     };

//     const handleShowProjectDetail = (proj) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             selectedProject: proj,
//         }));
//     };

//     const handleCloseModal = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             modalOpen: false,
//         }));
//     };

//     return (
//         <>
//             <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-[22] bg-opacity-80 absolute top-0 ${project.modalOpen ? '' : 'hidden'}`}>
//                 <div className='w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl relative'>
//                     <h2 className="text-2xl font-bold mb-2 text-center">Project Details</h2>
//                     <div className="flex flex-wrap justify-between max-w-xl">
//                         <div className="w-1/2 p-1">
//                             <h3 className="text-xl text-center font-semibold mb-2">Available Projects</h3>
//                             {project.availableProject.map((proj, ind) => (
//                                 <div key={ind} className="flex items-center mb-2">
//                                     <Checkbox
//                                         checked={false}
//                                         onChange={() => handleCheckboxChange(proj)}
//                                     />
//                                     <span className="flex-1">{proj.title}</span>
//                                 </div>
//                             ))}
//                             <div className="flex justify-center item-center">
//                                 <Button onClick={handleCheckboxChange} variant='contained'>Move</Button>
//                             </div>
//                         </div>
//                         <div className="w-1/2 p-2">
//                             <h3 className="text-xl text-center font-semibold mb-2">Done Projects</h3>
//                             {project.doneProjects.map((proj, index) => (
//                                 <div key={index} className="flex flex-col items-center mb-2">
//                                     <Checkbox
//                                         checked={true}
//                                         onChange={() => handleCheckboxChange(proj)}
//                                     />
//                                     <span className="flex-1">{proj.title}</span>
//                                     <div className="flex gap-2">
//                                         <Checkbox
//                                             onChange={() => handleEditProject(proj)}
//                                         /> Edit
//                                         <Checkbox
//                                             onChange={() => handleDeleteProject(proj)}
//                                         /> Delete
//                                         <Checkbox
//                                             onChange={() => handleShowProjectDetail(proj)}
//                                         /> View
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="flex justify-center gap-2">
//                                 <Button
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                                     onClick={moveToAvailable}
//                                 >
//                                     Move
//                                 </Button>
//                                 <Button
//                                     variant="contained"
//                                     className="bg-green-500 text-white px-4 py-2 rounded"
//                                     onClick={handleSaveEdit}
//                                 >
//                                     Save
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute right-1 top-1">
//                         <CrossIcon className='rotate-45 text-red-700' onClick={handleCloseModal} />
//                     </div>
//                     <div className="flex border-t-2 border-black flex-col gap-3 justify-center items-center mt-1">
//                         <input
//                             type="text"
//                             value={project.newProject}
//                             onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProject: e.target.value }))}
//                             className="p-2 border border-gray-300 rounded-md w-full mt-2 flex-1"
//                             placeholder="New project title"
//                         />
//                         <textarea
//                             value={project.newProjectDescription}
//                             onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProjectDescription: e.target.value }))}
//                             className="p-2 border border-gray-300 w-full rounded-md flex-1"
//                             placeholder="New project description"
//                         />
//                         <Button
//                             variant="contained"
//                             className="bg-blue-500 text-white px-4 py-2 rounded"
//                             onClick={handleAddProject}
//                         >
//                             Add Project
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             {project.selectedProject && (
//                 <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-30'>
//                     <div className='bg-white p-6 rounded-lg shadow-lg'>
//                         <h3 className='text-2xl font-bold mb-4'>{project.selectedProject.title}</h3>
//                         <p className='text-lg'>{project.selectedProject.description}</p>
//                         <div className="flex gap-2 items-center">
//                             <Checkbox
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                 onChange={() => handleEditProject(project.selectedProject)}
//                             /> Edit
//                             <Checkbox
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                 onChange={() => handleDeleteProject(project.selectedProject)}
//                             /> Delete
//                             <Button
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//                                 onClick={() => setProject((prevProject) => ({ ...prevProject, selectedProject: null }))}
//                             >
//                                 Close
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }



//_____________________________________

// import { Button, Checkbox } from '@mui/material';
// import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// export default function ProjectFile() {
//     const [project, setProject] = useState(() => {
//         const storedProjects = localStorage.getItem('Projects');
//         return {
//             availableProject: storedProjects ? JSON.parse(storedProjects) : [],
//             doneProjects: [],
//             newProject: '',
//             newProjectDescription: '',
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//             modalOpen: true,
//             selectedProject: null,
//             selectedAvailableProjects: [], // New state for selected available projects
//         };
//     });

//     useEffect(() => {
//         localStorage.setItem('Projects', JSON.stringify(project.availableProject));
//     }, [project.availableProject]);

//     const handleCheckboxChange = (projectToToggle) => {
//         setProject((prevProject) => {
//             const isAvailable = prevProject.availableProject.some((pro) => pro.id === projectToToggle.id);
//             const newSelectedProject = isAvailable ? null : projectToToggle;
//             return {
//                 ...prevProject,
//                 availableProject: isAvailable
//                     ? prevProject.availableProject.filter((pro) => pro.id !== projectToToggle.id)
//                     : [...prevProject.availableProject, projectToToggle],
//                 doneProjects: isAvailable
//                     ? [...prevProject.doneProjects, projectToToggle]
//                     : prevProject.doneProjects.filter((pro) => pro.id !== projectToToggle.id),
//                 selectedProject: newSelectedProject,
//                 selectedAvailableProjects: isAvailable
//                     ? prevProject.selectedAvailableProjects.filter((pro) => pro.id !== projectToToggle.id)
//                     : [...prevProject.selectedAvailableProjects, projectToToggle],
//             };
//         });
//     };

//     const handleBoxChange = (projectToToggle) => {
//         setProject((prevProject) => {
//             const isSelected = prevProject.selectedAvailableProjects.includes(projectToToggle);
//             return {
//                 ...prevProject,
//                 selectedAvailableProjects: isSelected ? prevProject.selectedAvailableProjects.filter((pro) => pro.id !== projectToToggle.id)
//                     : [...prevProject.selectedAvailableProjects, projectToToggle],
//             };
//         });
//     };

//     const moveToAvailable = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: [...prevProject.availableProject, ...prevProject.doneProjects],
//             doneProjects: [],
//             selectedProject: null,
//             selectedAvailableProjects: [], // Clear selected available projects
//         }));
//     };

//     const moveSelectedToDone = () => {
//         setProject((prevProject) => {
//             const remainingAvailable = prevProject.availableProject.filter(
//                 (proj) => !prevProject.selectedAvailableProjects.includes(proj)
//             );
//             return {
//                 ...prevProject,
//                 availableProject: remainingAvailable,
//                 doneProjects: [...prevProject.doneProjects, ...prevProject.selectedAvailableProjects],
//                 selectedAvailableProjects: [],
//             };
//         });
//     };

//     const handleAddProject = () => {
//         if (project.newProject.trim()) {
//             const newId = Date.now();
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: [
//                     ...prevProject.availableProject,
//                     { id: newId, title: prevProject.newProject.trim(), description: prevProject.newProjectDescription.trim() }
//                 ],
//                 newProject: '',
//                 newProjectDescription: '',
//             }));
//         }
//     };

//     const handleDeleteProject = (projectToDelete) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.filter((p) => p.id !== projectToDelete.id),
//             doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== projectToDelete.id),
//             selectedProject: prevProject.selectedProject?.id === projectToDelete.id ? null : prevProject.selectedProject,
//         }));
//     };

//     const handleEditProject = (projectToEdit) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             editingProject: projectToEdit,
//             editProjectTitle: projectToEdit.title,
//             editProjectDescription: projectToEdit.description,
//         }));
//     };

//     const handleSaveEdit = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.map((pro) =>
//                 pro.id === prevProject.editingProject.id
//                     ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                     : pro
//             ),
//             doneProjects: prevProject.doneProjects.map((pro) =>
//                 pro.id === prevProject.editingProject.id ?
//                     { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                     : pro
//             ),
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//         }));
//     };

//     const handleShowProjectDetail = (proj) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             selectedProject: proj,
//         }));
//     };

//     const handleCloseModal = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             modalOpen: false,
//         }));
//     };

//     return (
//         <>
//             <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-[22] bg-opacity-80 absolute top-0 ${project.modalOpen ? '' : 'hidden'}`}>
//                 <div className='w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl relative'>
//                     <h2 className="text-2xl font-bold mb-2 text-center">Project Details</h2>
//                     <div className="flex flex-wrap justify-between max-w-xl">
//                         <div className="w-1/2 md:w-1/2 p-1">
//                             <h3 className="text-xl text-center font-semibold mb-2">Available Projects</h3>
//                             {project.availableProject.map((proj, ind) => (
//                                 <div key={ind} className="flex flex-col md:flex-row items-center mb-2 w-full md:w-auto">
//                                     {project.editingProject?.id === proj.id ? (
//                                         <div className='flex flex-col gap-2 w-full items-center'>
//                                             <input
//                                                 type="text"
//                                                 value={project.editProjectTitle}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectTitle: e.target.value }))}
//                                                 className="p-2 border w-full border-gray-300 rounded-md  flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit title"
//                                             />
//                                             <textarea
//                                                 value={project.editProjectDescription}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectDescription: e.target.value }))}
//                                                 className="p-2 border border-gray-300 w-full rounded-md flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit description"
//                                             />
//                                             <Button
//                                                 variant="contained"
//                                                 className="bg-green-500 max-w-20 text-white px-1 py-2 rounded mr-2"
//                                                 onClick={handleSaveEdit}
//                                             >
//                                                 <SaveIcon />
//                                             </Button>
//                                         </div>
//                                     ) : (
//                                         <div className='flex flex-col gap-2 items-center w-full'>
//                                             <div className='flex gap-2 bg-green-300 p-2 rounded-xl'>
//                                                 <input
//                                                     type="checkbox"
//                                                     id={proj.id}
//                                                     name={proj.title}
//                                                     className="mr-1"
//                                                     checked={project.selectedAvailableProjects.includes(proj)}
//                                                     onChange={() => handleCheckboxChange(proj)}
//                                                 />
//                                                 <label htmlFor={proj.id} className="flex-1">{proj.title}</label>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <div className="flex flex-col gap-3 justify-center items-center mt-1">
//                                 <input
//                                     type="text"
//                                     value={project.newProject}
//                                     onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProject: e.target.value }))}
//                                     className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
//                                     placeholder="New project title"
//                                 />
//                                 <textarea
//                                     value={project.newProjectDescription}
//                                     onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProjectDescription: e.target.value }))}
//                                     className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
//                                     placeholder="New project description"
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                                     onClick={handleAddProject}
//                                 >
//                                     Add Project
//                                 </Button>
//                             </div>
//                             {project.selectedAvailableProjects.length > 0 && (
//                                 <Button
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                                     onClick={moveSelectedToDone}
//                                 >
//                                     Move to Done
//                                 </Button>
//                             )}
//                         </div>
//                         <div className="w-1/2 md:w-1/2 p-2 mx-auto grid grid-cols-1 ">
//                             <h3 className="text-xl text-center font-semibold mb-2">Done Projects</h3>
//                             {project.doneProjects.map((proj, index) => (
//                                 <div key={index} className="flex flex-col md:flex-row items-center mb-2 w-full md:w-auto">
//                                     {project.editingProject?.id === proj.id ? (
//                                         <div className='flex flex-col gap-2 w-full items-center'>
//                                             <input
//                                                 type="text"
//                                                 value={project.editProjectTitle}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectTitle: e.target.value }))}
//                                                 className="p-2 border w-full border-gray-300 rounded-md  flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit title"
//                                             />
//                                             <textarea
//                                                 value={project.editProjectDescription}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectDescription: e.target.value }))}
//                                                 className="p-2 border border-gray-300 w-full rounded-md flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit description"
//                                             />
//                                             <Button
//                                                 variant="contained"
//                                                 className="bg-green-500 max-w-20 text-white px-1 py-2 rounded mr-2"
//                                                 onClick={handleSaveEdit}
//                                             >
//                                                 <SaveIcon />
//                                             </Button>
//                                         </div>
//                                     ) : (
//                                         <div className='flex flex-col gap-2 items-center w-full'>
//                                             <div className='flex gap-2 items-center bg-green-300 p-2 rounded-xl'>
//                                                 <input
//                                                     type="checkbox"
//                                                     id={proj.id}
//                                                     name={proj.title}
//                                                     className="mr-1"
//                                                     checked={true}
//                                                     onChange={() => handleCheckboxChange(proj)}
//                                                 />
//                                                 <label htmlFor={proj.id} className="flex-1">{proj.title}</label>
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <div className="flex gap-2 items-center">
//                                                     <Checkbox
//                                                         variant="contained"
//                                                         className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                                         onClick={() => handleEditProject(proj)}
//                                                     />
//                                                     Edit
//                                                 </div>
//                                                 <div className="flex gap-2 items-center">
//                                                     <Checkbox
//                                                         variant="contained"
//                                                         className="bg-red-200 rounded-s-[18px] px-1"
//                                                         onClick={() => handleDeleteProject(proj)}
//                                                     />
//                                                     Delete
//                                                 </div>
//                                                 <div className="flex gap-2 items-center">
//                                                     <Checkbox
//                                                         variant='contained'
//                                                         className='bg-slate-300 rounded-xl p-1 z-50'
//                                                         onClick={() => handleShowProjectDetail(proj)}
//                                                     />
//                                                     Show
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <Button
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded max-h-10"
//                                 onClick={moveToAvailable}
//                             >
//                                 Move All to Available
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="absolute right-1 top-1">
//                         <CrossIcon className='rotate-45 text-red-700' onClick={handleCloseModal} />
//                     </div>
//                 </div>
//             </div>
//             {project.selectedProject && (
//                 <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-30'>
//                     <div className='bg-white p-6 rounded-lg shadow-lg'>
//                         <h3 className='text-2xl font-bold mb-4'>{project.selectedProject.title}</h3>
//                         <p className='text-lg'>{project.selectedProject.description}</p>
//                         <div className="flex gap-2 items-center">
//                             <div className="flex gap-2 items-center">
//                                 <Checkbox
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                 // onClick={() => handleEditProject(p)}
//                                 />
//                                 Edit
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <Checkbox
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                 // onClick={() => handleEditProject(p)}
//                                 />
//                                 Delete
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <Button
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//                                     onClick={() => setProject((prevProject) => ({ ...prevProject, selectedProject: null }))}
//                                 >
//                                     Close
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// _______________________

// import { Button, Checkbox } from '@mui/material';
// import React, { useEffect, useState } from 'react';

// export default function ProjectFile() {
//     const [project, setProject] = useState(() => {
//         const storedProjects = localStorage.getItem('Projects');
//         return {
//             availableProject: storedProjects ? JSON.parse(storedProjects) : [],
//             doneProjects: [],
//             newProject: '',
//             newProjectDescription: '',
//             selectedAvailableProjects: [],
//         };
//     });

//     useEffect(() => {
//         localStorage.setItem('Projects', JSON.stringify(project.availableProject));
//     }, [project.availableProject]);

//     const handleCheckboxChange = (projectToToggle) => {
//         setProject((prevProject) => {
//             const isSelected = prevProject.selectedAvailableProjects.includes(projectToToggle);
//             return {
//                 ...prevProject,
//                 selectedAvailableProjects: isSelected
//                     ? prevProject.selectedAvailableProjects.filter((pro) => pro.id !== projectToToggle.id)
//                     : [...prevProject.selectedAvailableProjects, projectToToggle],
//             };
//         });
//     };

//     const moveSelectedToDone = () => {
//         setProject((prevProject) => {
//             const remainingAvailable = prevProject.availableProject.filter(
//                 (proj) => !prevProject.selectedAvailableProjects.includes(proj)
//             );
//             return {
//                 ...prevProject,
//                 availableProject: remainingAvailable,
//                 doneProjects: [...prevProject.doneProjects, ...prevProject.selectedAvailableProjects],
//                 selectedAvailableProjects: [],
//             };
//         });
//     };

//     const handleAddProject = () => {
//         if (project.newProject.trim()) {
//             const newId = Date.now();
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: [
//                     ...prevProject.availableProject,
//                     { id: newId, title: prevProject.newProject.trim(), description: prevProject.newProjectDescription.trim() }
//                 ],
//                 newProject: '',
//                 newProjectDescription: '',
//             }));
//         }
//     };

//     return (
//         <div className="p-6">
//             <div className="mb-4">
//                 <h2 className="text-2xl font-bold mb-2 text-center">Available Projects</h2>
//                 {project.availableProject.map((proj, ind) => (
//                     <div key={ind} className="flex items-center mb-2">
//                         <Checkbox
//                             checked={project.selectedAvailableProjects.includes(proj)}
//                             onChange={() => handleCheckboxChange(proj)}
//                         />
//                         <label className="ml-2">{proj.title}</label>
//                     </div>
//                 ))}
//                 <div className="flex flex-col gap-3">
//                     <input
//                         type="text"
//                         value={project.newProject}
//                         onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProject: e.target.value }))}
//                         className="p-2 border border-gray-300 rounded-md"
//                         placeholder="New project title"
//                     />
//                     <textarea
//                         value={project.newProjectDescription}
//                         onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProjectDescription: e.target.value }))}
//                         className="p-2 border border-gray-300 rounded-md"
//                         placeholder="New project description"
//                     />
//                     <Button
//                         variant="contained"
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                         onClick={handleAddProject}
//                     >
//                         Add Project
//                     </Button>
//                 </div>
//                 {project.selectedAvailableProjects.length > 0 && (
//                     <Button
//                         variant="contained"
//                         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                         onClick={moveSelectedToDone}
//                     >
//                         Move to Done Projects
//                     </Button>
//                 )}
//             </div>
//             <div>
//                 <h2 className="text-2xl font-bold mb-2 text-center">Done Projects</h2>
//                 {project.doneProjects.map((proj, index) => (
//                     <div key={index} className="mb-2">
//                         <label>{proj.title}</label>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


// ________________________Project_Update______________

// import { Button } from '@mui/material';
// import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// export default function ProjectFile() {
//     const [project, setProject] = useState(() => {
//         const storedProjects = localStorage.getItem('Projects');
//         return {
//             availableProject: storedProjects ? JSON.parse(storedProjects) : [],
//             doneProjects: [],
//             newProject: '',
//             newProjectDescription: '',
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//             modalOpen: true,
//             selectedProject: null,
//         };
//     });


//     useEffect(() => {
//         localStorage.setItem('Projects', JSON.stringify(project.availableProject));
//     }, [project.availableProject]);

//     const handleCheckboxChange = (projectToToggle) => {
//         setProject((prevProject) => {
//             if (prevProject.availableProject.some((pro) => pro.id === projectToToggle.id)) {
//                 return {
//                     ...prevProject,
//                     availableProject: prevProject.availableProject.filter((pro) => pro.id !== projectToToggle.id),
//                     doneProjects: [...prevProject.doneProjects, projectToToggle],
//                 };
//             } else {
//                 return {
//                     ...prevProject,
//                     doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== projectToToggle.id),
//                     availableProject: [...prevProject.availableProject, projectToToggle],
//                 };
//             }
//         });
//     };

//     const moveToAvailable = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: [...prevProject.availableProject, ...prevProject.doneProjects],
//             doneProjects: [],
//         }));
//     };

//     const handleAddProject = () => {
//         if (project.newProject.trim()) {
//             const newId = Date.now();    // remove the blank space between the ID by .trim() method
//             setProject((prevProject) => ({
//                 ...prevProject,
//                 availableProject: [
//                     ...prevProject.availableProject,
//                     { id: newId, title: prevProject.newProject.trim(), description: prevProject.newProjectDescription.trim() }
//                 ],
//                 newProject: '',
//                 newProjectDescription: '',
//             }));
//         }
//     };

//     const handleDeleteProject = (projectToDelete) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.filter((p) => p.id !== projectToDelete.id),
//             doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== projectToDelete.id),
//         }));
//     };

//     const handleEditProject = (projectToEdit) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             editingProject: projectToEdit,
//             editProjectTitle: projectToEdit.title,
//             editProjectDescription: projectToEdit.description,
//         }));
//     };

//     const handleSaveEdit = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             availableProject: prevProject.availableProject.map((pro) =>
//                 pro.id === prevProject.editingProject.id
//                     ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                     : pro
//             ),
//             doneProjects: prevProject.doneProjects.map((pro) =>
//                 pro.id === prevProject.editingProject.id ?
//                     { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
//                     : pro
//             ),
//             editingProject: null,
//             editProjectTitle: '',
//             editProjectDescription: '',
//         }));
//     };

//     const handleShowProjectDetail = (proj) => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             selectedProject: proj,
//         }));
//     };

//     const handleCloseModal = () => {
//         setProject((prevProject) => ({
//             ...prevProject,
//             modalOpen: false,
//         }));
//     };

//     return (
//         <>
//             <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-50 bg-opacity-80 absolute top-0 ${project.modalOpen ? '' : 'hidden'}`}>
//                 <div className='w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl relative'>
//                     <h2 className="text-2xl font-bold mb-2 text-center">Project Details</h2>
//                     <div className="flex flex-wrap justify-between max-w-xl">
//                         <div className="w-1/2 md:w-1/2 p-1">
//                             <h3 className="text-xl text-center font-semibold mb-2">Available Projects</h3>
//                             {project.availableProject.map((proj, ind) => (
//                                 <div key={ind} className="flex flex-col md:flex-row items-center mb-2 w-full md:w-auto">
//                                     {project.editingProject?.id === proj.id ? (
//                                         <div className='flex flex-col gap-2 w-full items-center'>
//                                             <input
//                                                 type="text"
//                                                 value={project.editProjectTitle}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectTitle: e.target.value }))}
//                                                 className="p-2 border w-full border-gray-300 rounded-md  flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit title"
//                                             />
//                                             <textarea
//                                                 value={project.editProjectDescription}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectDescription: e.target.value }))}
//                                                 className="p-2 border border-gray-300 w-full rounded-md flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit description"
//                                             />
//                                             <Button
//                                                 variant="contained"
//                                                 className="bg-green-500 max-w-20 text-white px-1 py-2 rounded mr-2"
//                                                 onClick={handleSaveEdit}
//                                             >
//                                                 <SaveIcon />
//                                             </Button>
//                                         </div>
//                                     ) : (
//                                         <div className='flex flex-col gap-2 items-center w-full'>
//                                             <div className='flex gap-2 bg-green-300 p-2 rounded-xl'>
//                                                 <input
//                                                     type="checkbox"
//                                                     id={proj.id}
//                                                     name={proj.title}
//                                                     className="mr-1"
//                                                     checked={false}
//                                                     onChange={() => handleCheckboxChange(proj)}
//                                                 />
//                                                 <label htmlFor={proj.id} className="flex-1">{proj.title}</label>
//                                             </div>
//                                             {/* <div className="flex gap-2">
//                                                 <Button
//                                                     variant="contained"
//                                                     className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                                     onClick={() => handleEditProject(proj)}
//                                                 >
//                                                     <PencilIcon />
//                                                 </Button>
//                                                 <Button
//                                                     variant="contained"
//                                                     className="bg-red-200 rounded-s-[18px] px-1"
//                                                     onClick={() => handleDeleteProject(proj)}
//                                                 >
//                                                     <DeleteIcon className='text-red-900 ' />
//                                                 </Button>
//                                             </div> */}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             {/* Add peoject by below functionality. */}
//                             <div className="flex flex-col gap-3 justify-center items-center mt-1">
//                                 <input
//                                     type="text"
//                                     value={project.newProject}
//                                     onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProject: e.target.value }))}
//                                     className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
//                                     placeholder="New project title"
//                                 />
//                                 <textarea
//                                     value={project.newProjectDescription}
//                                     onChange={(e) => setProject((prevProject) => ({ ...prevProject, newProjectDescription: e.target.value }))}
//                                     className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
//                                     placeholder="New project description"
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                                     onClick={handleAddProject}
//                                 >
//                                     Add Project
//                                 </Button>
//                             </div>
//                         </div>
//                         <div className="w-1/2 md:w-1/2 p-2 mx-auto grid grid-cols-1 ">
//                             <h3 className="text-xl text-center font-semibold mb-2">Done Projects</h3>
//                             {project.doneProjects.map((proj, index) => (
//                                 <div key={index} className="flex flex-col md:flex-row items-center mb-2 w-full md:w-auto">
//                                     {project.editingProject?.id === proj.id ? (
//                                         <div className='flex flex-col gap-2 w-full items-center'>
//                                             <input
//                                                 type="text"
//                                                 value={project.editProjectTitle}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectTitle: e.target.value }))}
//                                                 className="p-2 border w-full border-gray-300 rounded-md  flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit title"
//                                             />
//                                             <textarea
//                                                 value={project.editProjectDescription}
//                                                 onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectDescription: e.target.value }))}
//                                                 className="p-2 border border-gray-300 w-full rounded-md flex-1 mb-2 md:mb-0"
//                                                 placeholder="Edit description"
//                                             />
//                                             <Button
//                                                 variant="contained"
//                                                 className="bg-green-500 max-w-20 text-white px-1 py-2 rounded mr-2"
//                                                 onClick={handleSaveEdit}
//                                             >
//                                                 <SaveIcon />
//                                             </Button>
//                                         </div>
//                                     ) : (
//                                         <div className='flex flex-col gap-2 items-center w-full'>
//                                             <div className='flex gap-2 items-center bg-green-300 p-2 rounded-xl'>
//                                                 <input
//                                                     type="checkbox"
//                                                     id={proj.id}
//                                                     name={proj.title}
//                                                     className="mr-1"
//                                                     checked={true}
//                                                     onChange={() => handleCheckboxChange(proj)}
//                                                 />
//                                                 <label htmlFor={proj.id} className="flex-1">{proj.title}</label>
//                                             </div>
//                                                 <div className="flex gap-2">
//                                                 <Button
//                                                     variant="contained"
//                                                     className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
//                                                     onClick={() => handleEditProject(proj)}
//                                                 >
//                                                     <PencilIcon />
//                                                 </Button>
//                                                 <Button
//                                                     variant="contained"
//                                                     className="bg-red-200 rounded-s-[18px] px-1"
//                                                     onClick={() => handleDeleteProject(proj)}
//                                                 >
//                                                     <DeleteIcon className='text-red-900 ' />
//                                                     </Button>
//                                                     <Button
//                                                         variant='contained'
//                                                         className='bg-slate-300 rounded-xl p-1'
//                                                         onClick={handleShowProjectDetail(proj)}
//                                                     >
//                                                         Show
//                                                     </Button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <Button
//                                 variant="contained"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded max-h-10"
//                                 onClick={moveToAvailable}
//                             >
//                                 Move All to Available
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="absolute right-1 top-1">
//                         <CrossIcon className='rotate-45 text-red-700' onClick={handleCloseModal} />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }



// ________________________________________________________

// import React, { useEffect, useState } from 'react';
// import { Button, Checkbox, TextField } from '@mui/material';

// export default function EmployeeDetailModal() {
//     const [state, setState] = useState({
//         employees: [],
//         selectedEmployees: [],
//         movedEmployees: [],
//         isEditing: false,
//         editingPermissions: {},
//     });

//     useEffect(() => {
//         const employees = localStorage.getItem('employeeData') || '[]';
//         const storedEmployees = JSON.parse(employees);
//         setState((prevState) => ({
//             ...prevState,
//             employees: storedEmployees,
//         }));
//     }, []);

//     const handleCheckboxChange = (index) => {
//         setState((prevState) => {
//             const isSelected = prevState.selectedEmployees.includes(index);
//             const selectedEmployees = isSelected
//                 ? prevState.selectedEmployees.filter((i) => i !== index)
//                 : [...prevState.selectedEmployees, index];

//             return {
//                 ...prevState,
//                 selectedEmployees,
//             };
//         });
//     };

//     const handleEditChange = (index, field, value) => {
//         const updatedMovedEmployees = state.movedEmployees.map((emp, empIndex) => {
//             if (empIndex === index) {
//                 return {
//                     ...emp,
//                     [field]: value,
//                 };
//             }
//             return emp;
//         });

//         setState((prevState) => ({
//             ...prevState,
//             movedEmployees: updatedMovedEmployees,
//         }));
//     };

//     const handleSave = () => {
//         const updatedEmployees = state.employees.map((emp, index) => {
//             const movedEmployeeIndex = state.movedEmployees.findIndex((movedEmp) => movedEmp.index === index);
//             if (movedEmployeeIndex !== -1) {
//                 return state.movedEmployees[movedEmployeeIndex];
//             }
//             return emp;
//         });

//         localStorage.setItem('employeeData', JSON.stringify(updatedEmployees));
//         setState((prevState) => ({
//             ...prevState,
//             employees: updatedEmployees,
//             isEditing: false,
//             selectedEmployees: [],
//             movedEmployees: [],
//             editingPermissions: {},
//         }));
//     };

//     const handleMove = () => {
//         const movedEmployees = state.selectedEmployees.map((index) => ({
//             ...state.employees[index],
//             index,
//         }));

//         setState((prevState) => ({
//             ...prevState,
//             movedEmployees,
//         }));
//     };

//     const handleEditPermission = (index) => {
//         setState((prevState) => ({
//             ...prevState,
//             editingPermissions: {
//                 ...prevState.editingPermissions,
//                 [index]: !prevState.editingPermissions[index],
//             },
//         }));
//     };

//     return (
//         <div className="bg-gray-500 z-20 relative min-h-screen bg-opacity-50">
//             <div className='container'>
//                 <div className="Container">
//                     <div className="max-w-3xl mx-auto absolute bg-opacity-15 top-52 right-[25%]">
//                         <h5 className='text-center w-full mb-5 font-semibold text-2xl'>Employee Details</h5>
//                         <div className="flex gap-20 justify-center items-center">
//                             <div className="border-2 flex gap-1 justify-center items-center">
//                                 {state.employees.map((emp, index) => (
//                                     <div className="text-lg w-40" key={index}>
//                                         <p>
//                                             <Checkbox
//                                                 checked={state.selectedEmployees.includes(index)}
//                                                 onChange={() => handleCheckboxChange(index)}
//                                             />
//                                             {emp.firstName}
//                                         </p>
//                                         <p>
//                                             <Checkbox
//                                                 checked={state.selectedEmployees.includes(index)}
//                                                 onChange={() => handleCheckboxChange(index)}
//                                             />
//                                             {emp.salary}
//                                         </p>
//                                         <p>
//                                             <Checkbox
//                                                 checked={state.selectedEmployees.includes(index)}
//                                                 onChange={() => handleCheckboxChange(index)}
//                                             />
//                                             {emp.department}
//                                         </p>
//                                         <p>
//                                             <Checkbox
//                                                 checked={state.selectedEmployees.includes(index)}
//                                                 onChange={() => handleCheckboxChange(index)}
//                                             />
//                                             {emp.designation}
//                                         </p>
//                                     </div>
//                                 ))}
//                                 <div className="flex flex-col gap-2 justify-center items-center">
//                                     {/* THis is employees' data box */}
//                                     {state.selectedEmployees.length > 0 && (
//                                         <Button
//                                             variant="contained"
//                                             color="error"
//                                             onClick={handleMove}
//                                         >
//                                             Move
//                                         </Button>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className='flex gap-2 justify-center items-center'>
//                                 {/* This side you show a display for edit the moved employees by click on edit button or select the check box. */}
//                                 {state.movedEmployees.map((emp, index) => (
//                                     <div className="text-lg w-44" key={index}>
//                                         <Checkbox
//                                             checked={state.editingPermissions[index] || false}
//                                             onChange={() => handleEditPermission(index)}
//                                         />
//                                         <p>
//                                             {state.editingPermissions[index] ? (
//                                                 <TextField
//                                                     value={emp.firstName}
//                                                     onChange={(e) => handleEditChange(index, 'firstName', e.target.value)}

//                                                 />
//                                             ) : (
//                                                 emp.firstName
//                                             )}
//                                         </p>
//                                         <p>
//                                             {state.editingPermissions[index] ? (
//                                                 <TextField
//                                                     value={emp.salary}
//                                                     onChange={(e) => handleEditChange(index, 'salary', e.target.value)}

//                                                 />
//                                             ) : (
//                                                 emp.salary
//                                             )}
//                                         </p>
//                                         <p>
//                                             {state.editingPermissions[index] ? (
//                                                 <TextField
//                                                     value={emp.department}
//                                                     onChange={(e) => handleEditChange(index, 'department', e.target.value)}

//                                                 />
//                                             ) : (
//                                                 emp.department
//                                             )}
//                                         </p>
//                                         <p>
//                                             {state.editingPermissions[index] ? (
//                                                 <TextField
//                                                     value={emp.designation}
//                                                     onChange={(e) => handleEditChange(index, 'designation', e.target.value)}

//                                                 />
//                                             ) : (
//                                                 emp.designation
//                                             )}
//                                         </p>
//                                     </div>
//                                 ))}
//                                 <div className="flex gap-2 max-h-9 justify-center items-center">
//                                     <Button
//                                         variant="contained"
//                                         color="success"
//                                         onClick={handleSave}
//                                     >
//                                         Save
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         onClick={() => setState((prevState) => ({
//                                             ...prevState,
//                                             isEditing: !prevState.isEditing,
//                                         }))}
//                                     >
//                                         Edit
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// ________________________________________________________

// import React, { useEffect, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Button } from '../ui/button'; // Adjust this import according to your project structure

// const localizer = momentLocalizer(moment);

// const CheckboxModal = ({ isOpen, onClose }) => {
//     const initialLabels = [
//         'Option 1',
//         'Option 2',
//         'Option 3',
//         'Option 4',
//     ];

//     const [availableLabels, setAvailableLabels] = useState(initialLabels);
//     const [selectedLabels, setSelectedLabels] = useState([]);

//     const handleCheckboxChange = (label) => {
//         if (availableLabels.includes(label)) {
//             setAvailableLabels(availableLabels.filter((item) => item !== label));
//             setSelectedLabels([...selectedLabels, label]);
//         } else {
//             setSelectedLabels(selectedLabels.filter((item) => item !== label));
//             setAvailableLabels([...availableLabels, label]);
//         }
//     };

//     const moveToAvailable = () => {
//         setAvailableLabels([...availableLabels, ...selectedLabels]);
//         setSelectedLabels([]);
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
//             <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold mb-4">Checkbox Modal</h2>
//                 <div className="flex justify-between">
//                     <div className="w-1/2 p-2">
//                         <h3 className="text-xl font-semibold mb-2">Available Options</h3>
//                         {availableLabels.map((label) => (
//                             <div key={label} className="flex items-center mb-2">
//                                 <input
//                                     type="checkbox"
//                                     id={label}
//                                     name={label}
//                                     className="mr-2"
//                                     checked={false}
//                                     onChange={() => handleCheckboxChange(label)}
//                                 />
//                                 <label htmlFor={label}>{label}</label>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="w-1/2 p-2">
//                         <h3 className="text-xl font-semibold mb-2">Selected Options</h3>
//                         {selectedLabels.map((label) => (
//                             <div key={label} className="flex items-center mb-2">
//                                 <input
//                                     type="checkbox"
//                                     id={label}
//                                     name={label}
//                                     className="mr-2"
//                                     checked={true}
//                                     onChange={() => handleCheckboxChange(label)}
//                                 />
//                                 <label htmlFor={label}>{label}</label>
//                             </div>
//                         ))}
//                         {selectedLabels.length > 0 && (
//                             <Button
//                                 variant="primary"
//                                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                                 onClick={moveToAvailable}
//                             >
//                                 Move to Available
//                             </Button>
//                         )}
//                     </div>
//                 </div>
//                 <Button
//                     variant="secondary"
//                     className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
//                     onClick={onClose}
//                 >
//                     Close
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default function CalendarDash() {
//     const [events, setEvents] = useState([]);
//     const [employeeBirthdays, setEmployeeBirthdays] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
//         setEvents(storedEvents);

//         const empData = JSON.parse(localStorage.getItem("employeeData")) || [];

//         const currentYear = new Date().getFullYear();
//         const empBirthdays = empData.map(emp => {
//             const birthDate = new Date(emp.birthDate);
//             const start = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
//             return {
//                 title: `${emp.firstName} ${emp.lastName} - Birthday`,
//                 start,
//                 end: start,
//                 allDay: true // To make it an all-day event
//             };
//         });
//         setEmployeeBirthdays(empBirthdays);
//     }, []);

//     const handleSelectDate = ({ start, end }) => {
//         const title = prompt('New Event Name');
//         const description = prompt('Event Description');
//         if (title) {
//             const newEvent = { title, start, end, description };
//             const updatedEvents = [...events, newEvent];
//             setEvents(updatedEvents);
//             localStorage.setItem('events', JSON.stringify(updatedEvents));
//         }
//     };

//     const handleEventChanges = (event) => {
//         const title = prompt('Edit Event name', event.title);
//         const description = prompt('Edit Event Description', event.extendedProps.description);
//         if (title) {
//             const updatedEvents = events.map(evt =>
//                 evt.start.toISOString() === event.start.toISOString() && evt.end.toISOString() === event.end.toISOString() ? { ...evt, title, description } : evt
//             );
//             setEvents(updatedEvents);
//             localStorage.setItem('events', JSON.stringify(updatedEvents));
//         }
//     };

//     const combinedEvents = [...events, ...employeeBirthdays];

//     return (
//         <div className="container">
//             <div className='Container'>
//                 <div className="mb-10">
//                     <div className='w-full sm:w-[700px] md:w-[900px] lg:w-[1000px] mx-auto'>
//                         <Calendar
//                             localizer={localizer}
//                             events={combinedEvents}
//                             startAccessor="start"
//                             endAccessor="end"
//                             style={{ height: 500 }}
//                             selectable
//                             onSelectSlot={handleSelectDate}
//                             onSelectEvent={handleEventChanges}
//                             className='w-full'
//                         />
//                     </div>
//                     <div className='mt-4 flex justify-center'>
//                         <Button
//                             variant="primary"
//                             className="bg-blue-500 text-white px-4 py-2 rounded"
//                             onClick={() => setIsModalOpen(true)}
//                         >
//                             Open Modal
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <CheckboxModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//         </div>
//     );
// }





// import React, { useEffect, useState } from 'react';
// import { Calendar, globalizeLocalizer } from 'react-big-calendar';
// import globalize from 'globalize';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from '@fullcalendar/interaction';

// const localizer = globalizeLocalizer(globalize);

// export default function CalendarComponent() {
//     const [userEvents, setUserEvents] = useState([]);
//     const [employeeBirthdays, setEmployeeBirthdays] = useState([]);

//     useEffect(() => {
//         const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
//         setUserEvents(storedEvents);

//         const empData = JSON.parse(localStorage.getItem("employeeData")) || [];
//         const currentYear = new Date().getFullYear();
//         const empBirthdays = empData.map(emp => {
//             const birthDate = new Date(emp.birthDate);
//             const start = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
//             return {
//                 title: `${emp.firstName} ${emp.lastName} - Birthday`,
//                 start,
//                 end: start,
//                 allDay: true // To make it an all-day event
//             };
//         });
//         setEmployeeBirthdays(empBirthdays);
//     }, []);

//     const handleSelectDate = ({ start, end }) => {
//         const title = prompt('New Event Name');
//         const description = prompt('Event Description');
//         if (title) {
//             const newEvent = { title, start, end, description };
//             const updatedEvents = [...userEvents, newEvent];
//             setUserEvents(updatedEvents);
//             localStorage.setItem('events', JSON.stringify(updatedEvents));
//         }
//     };

//     const handleEventChanges = (event) => {
//         const title = prompt('Edit Event name', event.title);
//         const description = prompt('Edit Event Description', event.extendedProps.description);
//         if (title) {
//             const updatedEvents = userEvents.map(evt =>
//                 evt.start.toISOString() === event.start.toISOString() && evt.end.toISOString() === event.end.toISOString()
//                     ? { ...evt, title, description }
//                     : evt
//             );
//             setUserEvents(updatedEvents);
//             localStorage.setItem('events', JSON.stringify(updatedEvents));
//         }
//     };

//     const combinedEvents = [...userEvents, ...employeeBirthdays];

//     return (
//         <div className='Container'>
//             <div className="flex gap-10 items-center flex-wrap px-32 my-20">
//                 <div className="w-full">
//                     <Calendar
//                         localizer={localizer}
//                         events={combinedEvents}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500 }}
//                         selectable
//                         onSelectSlot={handleSelectDate}
//                         onSelectEvent={handleEventChanges}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }



// 1-> Convert the selected date to a format that react - big - calendar and FullCalendar can understand.
// 2-> Ensure the start and end properties of the event are correctly set.
// 3-> Update the handleSelect and handleEventClick functions to include the correct date format.

// Explanation:
// Events Initialization:
// Use useEffect to load the initial events, including employee birthdays.

// handleSelect Function:
// This function is triggered when a user selects a date on the calendar.
// It prompts the user to enter the event's title and description.
// It sets the start and end dates for the new event.
// It updates the events state and stores the updated events in localStorage.

// handleEventClick Function:
// This function is triggered when a user clicks on an existing event.
// It prompts the user to edit the event's title and description.
// It updates the events state and stores the updated events in localStorage.

// Rendering the Calendar:
// Two calendar components are used: react - big - calendar and FullCalendar.
// Both calendars display the events from the events state.
// The react - big - calendar is configured to be selectable, triggering handleSelect on slot selection and handleEventClick on event selection.

// The FullCalendar is configured similarly, using dateClick for date selection and eventClick for event selection.

// _________________________TableByAPIofDataBase________________________
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import axios from "axios";
import { Button } from "@mui/material";
import { LucideEdit, LucideTrash2 } from "lucide-react";

// Custom hook to fetch data from a given URL
const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
};

export default function TableForEmployeeData() {
  const { data: employeeData, error: employeeError } = useGetData("http://localhost:3500/api/employees");
  const [editRowData, setEditRowData] = useState(null);

  // Function to handle edit button click
  const handleEditClick = (employee) => {
    setEditRowData(employee);  // Store the employee object in editRowData
  };

  // Function to save edited data
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3500/api/employees/${editRowData.id}`, editRowData); // Update the employee data using ID
      setEditRowData(null); // Clear the editing state
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving row: ", err);
      alert("Failed to update profile.");
    }
  };

  // Function to handle input change during editing
  const handleInputChange = (event, columnName) => {
    setEditRowData({ ...editRowData, [columnName]: event.target.value });  // Update the specific column data
  };

  // Function to delete an employee
  const handleDeleteClick = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:3500/api/employees/${employeeId}`); // Delete the employee data using ID
        alert("Profile deleted successfully!");
      } catch (err) {
        console.error("Error deleting row: ", err);
        alert("Failed to delete profile.");
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Position</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employeeData.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              {editRowData && editRowData.id === employee.id ? (
                <input
                  type="text"
                  value={editRowData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              ) : (
                employee.name
              )}
            </TableCell>
            <TableCell>
              {editRowData && editRowData.id === employee.id ? (
                <input
                  type="text"
                  value={editRowData.position}
                  onChange={(e) => handleInputChange(e, "position")}
                />
              ) : (
                employee.position
              )}
            </TableCell>
            <TableCell>
              {editRowData && editRowData.id === employee.id ? (
                <Button onClick={handleSaveClick}>Save</Button>
              ) : (
                <>
                  <Button onClick={() => handleEditClick(employee)}>
                    <LucideEdit />
                  </Button>
                  <Button onClick={() => handleDeleteClick(employee.id)}>
                    <LucideTrash2 />
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// FreeCodeCamp step 69:-
// function padRow(rowNumber, rowCount) {
//   return " ".repeat(rowCount-rowNumber) + character.repeat(rowNumber) + " ".repeat(rowNumber) + character.repeat(rowCount/rowNumber) + character.repeat(1);
// }