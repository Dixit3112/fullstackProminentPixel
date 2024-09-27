// import React, { useEffect, useState } from 'react';
// import { Button } from '../ui/button';
// import { CrossIcon, DeleteIcon, PencilIcon } from 'lucide-react';

// export default function TaskModalBox() {
//     const [availableTasks, setAvailableTasks] = useState(() => {
//         const savedTasks = localStorage.getItem("tasks");
//         return savedTasks ? JSON.parse(savedTasks) : [];
//     });
//     const [doneTasks, setDoneTasks] = useState([]);
//     const [newTask, setNewTask] = useState('');
//     const [editingTask, setEditingTask] = useState(null);
//     const [editTaskValue, setEditTaskValue] = useState('');
//     const [modalOpen, setModalOpen] = useState(true);

//     useEffect(() => {
//         localStorage.setItem("tasks", JSON.stringify(availableTasks));
//     }, [availableTasks]);

//     const handleCheckboxChange = (label) => {
//         if (availableTasks.includes(label)) {
//             setAvailableTasks(availableTasks.filter((item) => item !== label));
//             setDoneTasks([...doneTasks, label]);
//         } else {
//             setDoneTasks(doneTasks.filter((item) => item !== label));
//             setAvailableTasks([...availableTasks, label]);
//         }
//     };

//     const moveToAvailable = () => {
//         setAvailableTasks([...availableTasks, ...doneTasks]);
//         setDoneTasks([]);
//     };

//     const handleAddTask = () => {
//         if (newTask.trim()) {
//             setAvailableTasks([...availableTasks, newTask.trim()]);
//             setNewTask('');
//         }
//     };

//     const handleDeleteTask = (label) => {
//         setAvailableTasks(availableTasks.filter((task) => task !== label));
//     };

//     const handleEditTask = (label) => {
//         setEditingTask(label);
//         setEditTaskValue(label);
//     };

//     const handleSaveEdit = () => {
//         setAvailableTasks(availableTasks.map((task) => task === editingTask ? editTaskValue : task));
//         setEditingTask(null);
//         setEditTaskValue('');
//     };

//     const handleCloseModal = () => {
//         setModalOpen(false);
//         setAvailableTasks(JSON.parse(localStorage.getItem("tasks")));
//     };

//     return (
//         <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-50 bg-opacity-80 absolute top-0 ${modalOpen ? '' : 'hidden'}`}>
//             <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl relative">
//                 <h2 className="text-2xl font-bold mb-2">Task Modal</h2>
//                 <div className="flex justify-between max-w-xl">
//                     <div className="w-1/2 p-1">
//                         <h3 className="text-xl font-semibold mb-2">Available Tasks</h3>
//                         {availableTasks.map((label) => (
//                             <div key={label} className="flex items-center mb-2">
//                                 {editingTask === label ? (
//                                     <input
//                                         type="text"
//                                         value={editTaskValue}
//                                         onChange={(e) => setEditTaskValue(e.target.value)}
//                                         className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
//                                     />
//                                 ) : (
//                                     <>
//                                         <input
//                                             type="checkbox"
//                                             id={label}
//                                             name={label}
//                                             className="mr-1"
//                                             checked={false}
//                                             onChange={() => handleCheckboxChange(label)}
//                                         />
//                                         <label htmlFor={label}>{label}</label>
//                                     </>
//                                 )}
//                                 {editingTask === label ? (
//                                     <Button
//                                         variant="primary"
//                                         className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                                         onClick={handleSaveEdit}
//                                     >
//                                         Save
//                                     </Button>
//                                 ) : (
//                                     <>
//                                         <Button
//                                             variant="primary"
//                                             className="bg-blue-500 text-white px-4 py-2 rounded-s-[18px] mr-2"
//                                             onClick={() => handleEditTask(label)}
//                                         >
//                                             <PencilIcon />
//                                         </Button>
//                                         <Button
//                                             variant="danger"
//                                             className="bg-red-200 rounded-s-[18px] px-1"
//                                             onClick={() => handleDeleteTask(label)}
//                                         >
//                                             <DeleteIcon className='text-red-900 ' />
//                                         </Button>
//                                     </>
//                                 )}
//                             </div>
//                         ))}
//                         <div className="flex flex-col gap-3 justify-center items-center mt-1">
//                             <input
//                                 type="text"
//                                 value={newTask}
//                                 onChange={(e) => setNewTask(e.target.value)}
//                                 className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
//                                 placeholder="New task"
//                             />
//                             <Button
//                                 variant="primary"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 onClick={handleAddTask}
//                             >
//                                 Add Task
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="w-1/2 p-2">
//                         <h3 className="text-xl font-semibold mb-2">Done Tasks</h3>
//                         {doneTasks.map((label) => (
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
//                         {doneTasks.length > 0 && (
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
//                 <div className="absolute right-1 top-1">
//                     <CrossIcon className='rotate-45 text-red-700' onClick={handleCloseModal} />
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';

export default function TaskModalBox() {
    const [state, setState] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return {
            availableTasks: savedTasks ? JSON.parse(savedTasks) : [],
            doneTasks: [],
            newTask: '',
            editingTask: null,
            editTaskValue: '',
            modalOpen: true,
            taskDone: false,
        };
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(state.availableTasks));
    }, [state.availableTasks]);

    const handleCheckboxChange = (label) => {
        if (state.availableTasks.includes(label)) {

            setState((prevState) => ({
                ...prevState,
                availableTasks: prevState.availableTasks.filter((item) => item !== label),
                doneTasks: [...prevState.doneTasks, label],
                taskDone: !prevState.taskDone,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                doneTasks: prevState.doneTasks.filter((item) => item !== label),
                availableTasks: [...prevState.availableTasks, label],
            }));
        }
    };

    const moveToAvailable = () => {
        setState((prevState) => ({
            ...prevState,
            availableTasks: [...prevState.availableTasks, ...prevState.doneTasks],
            doneTasks: [],
        }));
    };

    const handleAddTask = () => {
        if (state.newTask.trim()) {
            setState((prevState) => ({
                ...prevState,
                availableTasks: [...prevState.availableTasks, prevState.newTask.trim()],
                newTask: '',
            }));
        }
    };

    const handleDeleteTask = (label) => {
        setState((prevState) => ({
            ...prevState,
            availableTasks: prevState.availableTasks.filter((task) => task !== label),
        }));
    };

    const handleEditTask = (label) => {
        setState((prevState) => ({
            ...prevState,
            editingTask: label,
            editTaskValue: label,
        }));
    };

    const handleSaveEdit = () => {
        setState((prevState) => ({
            ...prevState,
            availableTasks: prevState.availableTasks.map((task) => task === prevState.editingTask ? prevState.editTaskValue : task),
            editingTask: null,
            editTaskValue: '',
        }));
    };

    const handleCloseModal = () => {
        setState((prevState) => ({
            ...prevState,
            modalOpen: false,
        }));
    };

    return (
        <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-50 bg-opacity-80 absolute top-0 ${state.modalOpen ? '' : 'hidden'}`}>
            <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl relative">
                <h2 className="text-2xl font-bold mb-2">Task Modal</h2>
                <div className="flex flex-wrap justify-between max-w-xl">
                    <div className="w-full md:w-1/2 p-1">
                        <h3 className="text-xl font-semibold mb-2">Available Tasks</h3>
                        {state.availableTasks.map((label) => (
                            <div key={label} className="flex items-center mb-2">
                                {state.editingTask === label ? (
                                    <>
                                        <input
                                            type="text"
                                            value={state.editTaskValue}
                                            onChange={(e) => setState((prevState) => ({ ...prevState, editTaskValue: e.target.value }))}
                                            className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            id={label}
                                            name={label}
                                            className="mr-1"
                                            checked={false}
                                            onChange={() => handleCheckboxChange(label)}
                                        />
                                        <label htmlFor={label}>{label}</label>
                                    </>
                                )}
                                {state.editingTask === label ? (
                                    <Button
                                        variant="primary"
                                        className="bg-green-500 text-white px-1 py-2 rounded mr-2"
                                        onClick={handleSaveEdit}
                                    >
                                        <SaveIcon />
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="primary"
                                            className="bg-blue-500 text-white px-1 py-2 rounded-s-[18px] mr-2"
                                            onClick={() => handleEditTask(label)}
                                        >
                                            <PencilIcon />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="bg-red-200 rounded-s-[18px] px-1"
                                            onClick={() => handleDeleteTask(label)}
                                        >
                                            <DeleteIcon className='text-red-900 ' />
                                        </Button>
                                    </>
                                )}
                            </div>
                        ))}
                        <div className="flex flex-col gap-3 justify-center items-center mt-1">
                            <input
                                type="text"
                                value={state.newTask}
                                onChange={(e) => setState((prevState) => ({ ...prevState, newTask: e.target.value }))}
                                className="p-2 border border-gray-300 rounded-md mr-2 flex-1"
                                placeholder="New task"
                            />
                            <Button
                                variant="primary"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleAddTask}
                            >
                                Add Task
                            </Button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <h3 className="text-xl font-semibold mb-2">Done Tasks</h3>
                        {state.doneTasks.map((label) => (
                            <div key={label} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={label}
                                    name={label}
                                    className="mr-2"
                                    checked={true}
                                    onChange={() => handleCheckboxChange(label)}
                                />
                                <label htmlFor={label}>{label}</label>
                            </div>
                        ))}
                        {state.doneTasks.length > 0 && (
                            <Button
                                variant="primary"
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={moveToAvailable}
                            >
                                Move to Available
                            </Button>
                        )}
                    </div>
                </div>
                <div className="absolute right-1 top-1">
                    <CrossIcon className='rotate-45 text-red-700' onClick={handleCloseModal} />
                </div>
            </div>
        </div>
    );
}


