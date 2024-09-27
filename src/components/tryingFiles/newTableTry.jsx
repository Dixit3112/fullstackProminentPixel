import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
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
        await axios.delete(`http://localhost:3500/api/employees/${employeeId}`); // Delete employee by ID
        alert("Employee deleted successfully!");
      } catch (err) {
        console.error("Error deleting row: ", err);
        alert("Failed to delete employee.");
      }
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Position", accessor: "position" },
    { header: "Salary", accessor: "salary" }  // Assuming salary is fetched directly
  ];

  if (employeeError) return <div>Error loading data: {employeeError.message}</div>;

  return (
    <div className="container">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessor}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[employeeData].map((employee) => (
            <TableRow key={employee.id} className={editRowData && editRowData.id === employee.id ? "bg-white" : ""}>
              {columns.map((column) => (
                <TableCell key={column.accessor}>
                  {editRowData && editRowData.id === employee.id ? (
                    <input
                      type="text"
                      value={editRowData[column.accessor] || ""}
                      onChange={(e) => handleInputChange(e, column.accessor)}
                      className="w-full border border-black p-1"
                    />
                  ) : (
                    employee[column.accessor]
                  )}
                </TableCell>
              ))}
              <TableCell className="flex justify-center items-center">
                {editRowData && editRowData.id === employee.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveClick}
                    className="mr-2"
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(employee)}
                      className="mr-2"
                    >
                      <LucideEdit width={16} height={16} />
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(employee.id)}
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
}
