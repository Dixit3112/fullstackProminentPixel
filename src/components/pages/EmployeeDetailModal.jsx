import React, { useEffect, useState } from 'react';
import { Button, Checkbox, TextField } from '@mui/material';

export default function EmployeeDetailModal() {
    const [state, setState] = useState({
        employees: [],
        selectedEmployees: [],
        movedEmployees: [],
        isEditing: false,
        editingPermissions: {},
    });

    useEffect(() => {
        const employees = localStorage.getItem('employeeData') || '[]';
        const storedEmployees = JSON.parse(employees);
        setState((prevData) => ({
            ...prevData,
            employees: storedEmployees,
        }));
    }, []);

    const handleCheckboxChange = (index) => {
        setState((prevState) => {
            const isSelected = prevState.selectedEmployees.includes(index);
            const selectedEmployees = isSelected ? prevState.selectedEmployees.filter((i) => i !== index)
                : [...prevState.selectedEmployees, index];
            return {
                ...prevState,
                selectedEmployees,
            };
        });
    };

    const handleEditChange = (index, field, value) => {
        const updatedMovedEmployees = state.movedEmployees.map((emp, empIndex) => {
            if (empIndex === index) {
                return {
                    ...emp,
                    [field]: value,
                };
            }
            return emp;
        });

        setState((prevState) => ({
            ...prevState,
            movedEmployees: updatedMovedEmployees,
        }));
    };

    const handleSave = () => {
        const updatedEmployees = state.employees.map((emp, index) => {
            const movedEmployeeIndex = state.movedEmployees.findIndex((movedEmp) => movedEmp.index === index);
            if (movedEmployeeIndex !== -1) {
                return state.movedEmployees[movedEmployeeIndex];
            }
            return emp;
        });

        localStorage.setItem('employeeData', JSON.stringify(updatedEmployees));
        setState((prevState) => ({
            ...prevState,
            employees: updatedEmployees,
            isEditing: false,
            selectedEmployees: [],
            movedEmployees: [],
            editingPermissions: {},
        }));
    };

    const handleMove = () => {
        const movedEmployees = state.selectedEmployees.map((index) => ({
            ...state.employees[index],
            index,
        }));
        setState((prevState) => ({
            ...prevState,
            movedEmployees,
        }));
    };

    const handleEditPermission = (index) => {
        setState((prevState) => ({
            ...prevState,
            editingPermissions: {
                ...prevState.editingPermissions,
                [index]: !prevState.editingPermissions[index],
            },
        }));
    };

    return (
        <div className="bg-gray-500 z-20 relative min-h-screen bg-opacity-50">
            <div className='container'>
                <div className="Container">
                        <h5 className='text-center w-full mb-5 font-semibold text-2xl'>Employee Details</h5>
                    <div className="max-w-3xl mx-auto absolute bg-opacity-15 top-32 right-[25%]">
                        <div className="flex gap-20 justify-center items-center">
                            <div className="border-2 flex flex-col gap-1 justify-center items-center">
                                <div className="flex"></div>
                                {state.employees.map((emp, index) => (
                                    <div className="w-40" key={index}>
                                        <p>
                                            <Checkbox
                                                checked={state.selectedEmployees.includes(index)}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                            {emp.firstName}
                                        </p>
                                    </div>
                                ))}
                                <div className="flex flex-col gap-2 mr-5 justify-center items-center">
                                    {/* THis is employees' data box */}
                                    {state.selectedEmployees.length > 0 && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleMove}
                                        >
                                            Move
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-5 justify-center items-center'>
                                {/* This side you show a display for edit the moved employees details by click on edit button or select the check box. */}
                                {state.movedEmployees.map((emp, index) => (
                                    <div className="text-lg flex flex-col items-center justify-center w-44" key={index}>
                                        <Checkbox
                                            checked={state.editingPermissions[index] || false}
                                            onChange={() => handleEditPermission(index)}
                                        />
                                        <p>
                                            {state.editingPermissions[index] ? (
                                                <TextField
                                                    value={emp.firstName}
                                                    onChange={(e) => handleEditChange(index, 'firstName', e.target.value)}
                                                />
                                            ) : (
                                                emp.firstName
                                            )}
                                        </p>
                                        <p>
                                            {state.editingPermissions[index] ? (
                                                <TextField
                                                    value={emp.salary}
                                                    onChange={(e) => handleEditChange(index, 'salary', e.target.value)}

                                                />
                                            ) : (
                                                emp.salary
                                            )}
                                        </p>
                                        <p>
                                            {state.editingPermissions[index] ? (
                                                <TextField
                                                    value={emp.department}
                                                    onChange={(e) => handleEditChange(index, 'department', e.target.value)}

                                                />
                                            ) : (
                                                emp.department
                                            )}
                                        </p>
                                        <p>
                                            {state.editingPermissions[index] ? (
                                                <TextField
                                                    value={emp.designation}
                                                    onChange={(e) => handleEditChange(index, 'designation', e.target.value)}

                                                />
                                            ) : (
                                                emp.designation
                                            )}
                                        </p>
                                        {/* <p>
                                            {state.editingPermissions[index] ? (
                                                <TextField
                                                    value={emp.birthDate}
                                                    onChange={(e) => handleEditChange(index, 'birthDate', e.target.value)}

                                                />
                                            ) : (
                                                emp.birthDate
                                            )}
                                        </p> */}
                                    </div>
                                ))}
                                <div className="flex gap-5 max-h-9 justify-center items-center">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleEditPermission(index)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



