import React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { LucideEdit, LucideTrash2 } from "lucide-react";
import axios from "axios";

export default function UserTable() {

    const [editRowIndex, setEditRowIndex] = useState(null);

    const initialData = [
        { firstName: "Dixit", lastName: "Rakholiya", email: "ddr@gmail.com" }
    ];
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("employeeData");
        return savedData ? JSON.parse(savedData) : initialData;
    });
    // const [editCell, setEditCell] = useState({ rowIndex: null, columnName: null });

    useEffect(() => {
        localStorage.setItem("userDataTable", JSON.stringify(data));
        axios.get('http://localhost:3500/api/employees')
    }, [data]);

    const handleInputChange = (e, rowIndex, columnName) => {
        const updatedData = [...data];
        updatedData[rowIndex][columnName] = e.target.value;
        setData(updatedData);
    };

    const handleDeleteClick = (rowIndex) => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            const updatedData = data.filter((_, index) => index !== rowIndex);
            setData(updatedData);
            alert("Profile deleted.");
        } else {
            alert("Thank you, for your answer. 🙏");
        }
    };

    const handleEditClick = (rowIndex) => {
        setEditRowIndex(rowIndex);
    };

    const handleSaveClick = () => {
        setEditRowIndex(null);
        localStorage.setItem("employeeData", JSON.stringify(data));
        alert("Profile updated.");
    };

    const columns = [
        { header: "First Name", accessor: "firstName" },
        { header: "Last Name", accessor: "lastName" },
        { header: "Email", accessor: "primaryEmail" },
        { header: "Contact No.", accessor: "phoneNo" },
        { header: "Department", accessor: "department" },
        { header: "Designation", accessor: "designation" },
    ];

    return (
        <div className="max-w-[1280px]  min-h-max rounded-[10px] bg-blue-400 ">
            <Table className="min-w-full divide-y divide-gray-800">
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.accessor}>{column.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className={editRowIndex === rowIndex ? "bg-white" : ""}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.accessor}
                                    onClick={() => handleCellClick(rowIndex, column.accessor)}
                                >
                                    {editRowIndex === rowIndex ? (
                                        <input
                                            type="text"
                                            value={row[column.accessor]}
                                            onChange={(e) => handleInputChange(e, rowIndex, column.accessor)}
                                            className="w-full border border-black p-1"
                                        />
                                    ) : (
                                        row[column.accessor]
                                    )}
                                </TableCell>
                            ))}
                            <TableCell className="flex justify-center items-center">
                                {editRowIndex === rowIndex ? (
                                    <Button
                                        variant="primary"
                                        className="bg-blue-300 rounded-xl px-5 text-fuchsia-950 hover:bg-blue-950 hover:text-white duration-300 hover:duration-300"
                                        onClick={handleSaveClick}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="primary"
                                            className="bg-blue-300 rounded-xl px-5 mr-1 text-fuchsia-950 hover:bg-blue-950 hover:text-white duration-300 hover:duration-300"
                                            onClick={() => handleEditClick(rowIndex)}
                                        >
                                            <LucideEdit width={16} height={16} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="bg-red-300 rounded-xl px-5 ml-1 text-fuchsia-950 hover:bg-red-800 hover:text-white duration-300 hover:duration-300"
                                            onClick={() => handleDeleteClick(rowIndex)}
                                        >
                                            <LucideTrash2 width={16} height={16} />
                                        </Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

