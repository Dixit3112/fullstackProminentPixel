// CREATE TABLE employees (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   phone VARCHAR(15),
//   department VARCHAR(50)
// );


// // backend file code for DB store froom FrontEnd

// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');

// const app = express();
// app.use(bodyParser.json());

// const pool = new Pool({
//     user: 'yourusername',
//     host: 'localhost',
//     database: 'yourdatabase',
//     password: 'yourpassword',
//     port: 5432,
// });

// app.post('/add-employee', async (req, res) => {
//     const { name, email, phone, department } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO employees (name, email, phone, department) VALUES ($1, $2, $3, $4) RETURNING *',
//             [name, email, phone, department]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });



// //  FrontEnd call for data store in Database Table.

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Add Employee</title>
// </head>
// <body>
//     <form id="employeeForm">
//         <label for="name">Name:</label>
//         <input type="text" id="name" name="name" required><br>
//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email" required><br>
//         <label for="phone">Phone:</label>
//         <input type="text" id="phone" name="phone"><br>
//         <label for="department">Department:</label>
//         <input type="text" id="department" name="department"><br>
//         <button type="submit">Add Employee</button>
//     </form>
//     <script>
//         document.getElementById('employeeForm').addEventListener('submit', async (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.target);
//             const data = Object.fromEntries(formData.entries());
//             try {
//                 const response = await fetch('/add-employee', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(data)
//                 });
//                 const result = await response.json();
//                 console.log('Employee added:', result);
//             } catch (error) {
//                 console.error('Error adding employee:', error);
//             }
//         });
//     </script>
// </body>
// </html>
