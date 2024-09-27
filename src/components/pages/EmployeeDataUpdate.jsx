import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableBody, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Edit2Icon, LucideTrash2 } from 'lucide-react';
import LoadingDots from '../loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = lazy(() =>
  wait(1000)
    .then(() => import('@mui/material'))
    .then((module) => ({ default: module.Modal }))
);

const SaveButton = lazy(() =>
  wait(1000)
    .then(() => import('@mui/material'))
    .then((module) => ({ default: module.Button }))
);

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export default function EmployeeDatabase() {
  const [employee, setEmployee] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/employees');
      setEmployee(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleEditClick = (emp) => {
    setSelectedEmployee({
      ...emp,
      departmentId: emp.Department?.id || '',
      departmentName: emp.Department?.name || '',
      salary: emp.salary?.salary || '',
    });

    setIsModalLoading(true); // Set modal loading to true

    setTimeout(() => {
      setIsModalLoading(false); // Set modal loading to false
      setEditModalOpen(true);
    }, 2000); // Simulate loading time
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:3500/api/employees/${id}`);
        fetchEmployeeData();
        toast.success("Employee deleted successfully");
      } catch (error) {
        console.error("Error deleting employee: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setSelectedEmployee({ ...selectedEmployee, departmentName: value });
    } else {
      setSelectedEmployee({ ...selectedEmployee, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const updatedEmployeeData = {
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        position: selectedEmployee.position,
        salary: selectedEmployee.salary,
      };

      await axios.put(`http://localhost:3500/api/employees/${selectedEmployee.id}`, updatedEmployeeData);

      const updatedSalary = {
        salary: selectedEmployee.salary,
      };
      await axios.put(`http://localhost:3500/api/salaries/${selectedEmployee.id}`, updatedSalary);

      const updatedDepartment = {
        name: selectedEmployee.departmentName,
      };

      await axios.put(`http://localhost:3500/api/departments/${selectedEmployee.departmentId}`, updatedDepartment);

      setEditModalOpen(false);
      fetchEmployeeData();

      toast.success('Employee data edited successfully!');
    } catch (error) {
      console.error("Error updating employee: ", error.response?.data || error.message);
      toast.error('Error updating employee data.');
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="container my-10 mx-auto px-4">
          <div className='flex flex-col items-center'>
            <h3 className='text-2xl md:text-4xl font-serif font-semibold'>Employee Database Data</h3>
            <div className="flex justify-center items-center font-semibold text-5">
              <Table className="bg-green-100 rounded-2xl w-[850px] h-80">
                <TableHeader className='rounded-2xl'>
                  <TableRow className='rounded-2xl text-center w-full'>
                    <TableHead className='w-auto px-2 text-center md:w-44'>Actions</TableHead>
                    <TableHead className='w-auto px-2 text-center md:w-44'>ID</TableHead>
                    <TableHead className='w-auto px-2 text-center md:w-44'>Name</TableHead>
                    <TableHead className='w-auto px-2 text-center md:w-44'>Email</TableHead>
                    <TableHead className='w-auto px-2 text-center md:w-44'>Position</TableHead>
                    <TableHead className='w-auto px-2 text-center md:w-44'>Department</TableHead>
                    <TableHead className='w-auto px-2 text-center md:w-44'>Salary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.length > 0 ? employee.map((emp, index) => (
                    <TableRow key={index}>
                      <TableCell className='rounded-2xl text-center w-44'>
                        <div className="flex justify-center items-center gap-4">
                          <Suspense fallback={<LoadingDots />}>
                            <Edit2Icon className='text-2xl text-blue-600 cursor-pointer' onClick={() => handleEditClick(emp)} />
                          </Suspense>
                          <LucideTrash2 className='text-2xl text-red-600 cursor-pointer' onClick={() => handleDeleteClick(emp.id)} />
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>{emp.id}</TableCell>
                      <TableCell className='text-center'>{emp.name}</TableCell>
                      <TableCell className='text-center'>{emp.email}</TableCell>
                      <TableCell className='text-center'>{emp.position}</TableCell>
                      <TableCell className='text-center'>{emp.Department?.name}</TableCell>
                      <TableCell className='text-center'>{emp.salary?.salary}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No Employee Data Available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <Suspense fallback={<LoadingDots />}>
            {editModalOpen && (
              <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                {isModalLoading ? (
                  <LoadingDots />
                ) : (
                  <div className="bg-white p-6 rounded-md flex flex-col gap-4 w-11/12 sm:w-[400px] mx-auto mt-20">
                    <h2 className="text-lg md:text-xl font-bold">Edit Employee</h2>
                    <TextField
                      label="Name"
                      name="name"
                      value={selectedEmployee.name || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={selectedEmployee.email || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Position"
                      name="position"
                      value={selectedEmployee.position || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Department"
                      name="department"
                      value={selectedEmployee.departmentName || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Salary"
                      name="salary"
                      value={selectedEmployee.salary || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <div className="flex gap-2 mt-4">
                      <Suspense fallback={<LoadingDots />}>
                        <SaveButton variant="contained" color="primary" onClick={handleSave}>
                          <p className='text-xl font-semibold font-sans'>
                          Save
                          </p>
                        </SaveButton>
                      </Suspense>
                      <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)}>
                      <p className='text-xl font-semibold font-sans'>
                      Cancel
                      </p>
                      </Button>
                    </div>
                  </div>
                )}
              </Modal>
            )}
          </Suspense>
        </div>
      )}
    </>
  );
}