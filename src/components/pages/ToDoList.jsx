import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ToDoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("ToDoTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      desscription: task,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };
  const handleCheckboxChange = (id) => {
    const updateTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(updateTasks);
  };

  useEffect(() => {
    localStorage.setItem("ToDoTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className="container">
        <div className="Container">
          <div className="flex justify-start items-center flex-col mt-10 text-center place-items-center">
            <h1 className="font-extrabold text-3xl font-serif mb-10">To Do List</h1>
            <div className="flex flex-col justify-center items-center todoList">
              <form onSubmit={handleSubmit} className="mb-8">
                <input
                  type="text"
                  value={task}
                  onChange={handleInputChange}
                  placeholder="Enter your task here..."
                  className="border-b-2 border-blue-600 w-[546px] text-lg font-bold"
                />
                <button
                  type="submit"
                  className="btn ml-2 rounded-lg text-green font-serif hover: shadow-md "
                  onClick={() => handleSubmit}
                >
                  <Button variant="contained">Add</Button>
                </button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th className="w-[500px] h-10 text-start font-serif text-xl">
                      Task
                    </th>
                    <th className="w-[50px] h-10 text-start font-serif text-xl">
                      Check
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="w-full text-start">
                      <td
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                        className='text-slate-800 ml-10 p-2 capitalize text-xl font-semibold font-serif'
                      >
                        {task.desscription}
                      </td>
                      <td className="font-serif w-10 text-center">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => handleCheckboxChange(task.id)}
                          className="px-32"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
