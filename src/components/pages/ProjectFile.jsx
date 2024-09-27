import { Button, Checkbox } from '@mui/material';
import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ProjectFile() {
    const [project, setProject] = useState(() => {
        const storedProjects = localStorage.getItem('Projects');
        return {
            availableProject: storedProjects ? JSON.parse(storedProjects) : [],
            doneProjects: [],
            newProject: '',
            newProjectDescription: '',
            editingProject: null,
            editProjectTitle: '',
            editProjectDescription: '',
            modalOpen: true,
            selectedProject: null,
            selectedProjectsForMove: [],
            selectedDoneProjectsForMove: [],
            actionCheckboxes: {},
        };
    });

    useEffect(() => {
        localStorage.setItem('Projects', JSON.stringify(project.availableProject));
    }, [project.availableProject]);

    const handleCheckboxChange = (projectToToggle, isDoneProject) => {
        setProject((prevProject) => {
            const selectedProjectsKey = isDoneProject ? 'selectedDoneProjectsForMove' : 'selectedProjectsForMove';
            const isSelected = prevProject[selectedProjectsKey].some((pro) => pro.id === projectToToggle.id);
            return {
                ...prevProject,
                [selectedProjectsKey]: isSelected
                    ? prevProject[selectedProjectsKey].filter((pro) => pro.id !== projectToToggle.id)
                    : [...prevProject[selectedProjectsKey], projectToToggle],
            };
        });
    };

    const handleActionCheckboxChange = (projectId, action) => {
        setProject((prevProject) => {
            const updatedCheckboxes = { ...prevProject.actionCheckboxes };
            if (!updatedCheckboxes[projectId]) {
                updatedCheckboxes[projectId] = {};
            }
            updatedCheckboxes[projectId][action] = !updatedCheckboxes[projectId][action];
            return { ...prevProject, actionCheckboxes: updatedCheckboxes };
        });
    };

    const moveToDone = () => {
        setProject((prevProject) => {
            const selectedProjectIds = new Set(prevProject.selectedProjectsForMove.map((pro) => pro.id));
            const newAvailableProjects = prevProject.availableProject.filter((pro) => !selectedProjectIds.has(pro.id));
            const newDoneProjects = [
                ...prevProject.doneProjects,
                ...prevProject.availableProject.filter((pro) => selectedProjectIds.has(pro.id))
            ];
            return {
                ...prevProject,
                availableProject: newAvailableProjects,
                doneProjects: newDoneProjects,
                selectedProjectsForMove: [],
            };
        });
    };

    const moveToAvailable = () => {
        setProject((prevProject) => {
            const selectedProjectIds = new Set(prevProject.selectedDoneProjectsForMove.map((pro) => pro.id));
            const newDoneProjects = prevProject.doneProjects.filter((pro) => !selectedProjectIds.has(pro.id));
            const newAvailableProjects = [
                ...prevProject.availableProject,
                ...prevProject.doneProjects.filter((pro) => selectedProjectIds.has(pro.id))
            ];
            return {
                ...prevProject,
                availableProject: newAvailableProjects,
                doneProjects: newDoneProjects,
                selectedDoneProjectsForMove: [],
            };
        });
    };

    const handleAddProject = () => {
        if (project.newProject.trim()) {
            const newId = Date.now();
            setProject((prevProject) => ({
                ...prevProject,
                availableProject: [
                    ...prevProject.availableProject,
                    { id: newId, title: prevProject.newProject.trim(), description: prevProject.newProjectDescription.trim() }
                ],
                newProject: '',
                newProjectDescription: '',
            }));
        }
    };

    const handleDeleteProject = (projectToDelete) => {
        setProject((prevProject) => ({
            ...prevProject,
            availableProject: prevProject.availableProject.filter((p) => p.id !== projectToDelete.id),
            doneProjects: prevProject.doneProjects.filter((pro) => pro.id !== projectToDelete.id),
            selectedProject: prevProject.selectedProject?.id === projectToDelete.id ? null : prevProject.selectedProject,
            selectedProjectsForMove: prevProject.selectedProjectsForMove.filter((pro) => pro.id !== projectToDelete.id),
            selectedDoneProjectsForMove: prevProject.selectedDoneProjectsForMove.filter((pro) => pro.id !== projectToDelete.id),
        }));
    };

    const handleEditProject = (projectToEdit) => {
        setProject((prevProject) => ({
            ...prevProject,
            editingProject: projectToEdit,
            editProjectTitle: projectToEdit.title,
            editProjectDescription: projectToEdit.description,
        }));
    };

    const handleSaveEdit = () => {
        if (project.editingProject) {
            setProject((prevProject) => ({
                ...prevProject,
                availableProject: prevProject.availableProject.map((pro) =>
                    pro.id === prevProject.editingProject.id
                        ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
                        : pro
                ),
                doneProjects: prevProject.doneProjects.map((pro) =>
                    pro.id === prevProject.editingProject.id
                        ? { ...pro, title: prevProject.editProjectTitle, description: prevProject.editProjectDescription }
                        : pro
                ),
                editingProject: null,
                editProjectTitle: '',
                editProjectDescription: '',
            }));
        }
    };

    const handleShowProjectDetail = (proj) => {
        setProject((prevProject) => ({
            ...prevProject,
            selectedProject: proj,
        }));
    };

    const handleCloseModal = () => {
        setProject((prevProject) => ({
            ...prevProject,
            modalOpen: false,
        }));
    };

    return (
        <>
            <div className={`flex justify-center items-center min-h-screen bg-gray-700 w-full z-[22] bg-opacity-80 absolute top-0 ${project.modalOpen ? '' : 'hidden'}`}>
                <div className='w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl relative'>
                    <h2 className="text-2xl font-bold my-1 text-center">Project Details</h2>
                    <div className="flex flex-wrap justify-between max-w-xl">
                        <div className="w-1/2 p-1">
                            <h3 className="text-xl text-center font-semibold mb-2">Available Projects</h3>
                            {project.availableProject.map((proj, ind) => (
                                <div key={ind} className="flex flex-col mb-2 pb-2">
                                    <div className="flex items-center mb-2">
                                        <Checkbox
                                            checked={project.selectedProjectsForMove.some((p) => p.id === proj.id)}
                                            onChange={() => handleCheckboxChange(proj, false)}
                                        />
                                        <span className="flex-1">{proj.title}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center item-center">
                                <Button onClick={moveToDone} variant='contained'>Move</Button>
                            </div>
                        </div>
                        <div className="w-1/2 p-2">
                            <h3 className="text-xl text-center font-semibold mb-2">Done Projects</h3>
                            {project.doneProjects.map((proj, index) => (
                                <div key={index} className="flex flex-col mb-2 pb-2">
                                    <div className="flex items-center mb-2">
                                        <Checkbox
                                            checked={project.selectedDoneProjectsForMove.some((p) => p.id === proj.id)}
                                            onChange={() => handleCheckboxChange(proj, true)}
                                        />
                                        <span className="flex-1">{proj.title}</span>
                                    </div>
                                    {project.selectedDoneProjectsForMove.some((p) => p.id === proj.id) && (
                                        <div className="flex gap-2 items-center">
                                            <Checkbox
                                                checked={project.actionCheckboxes[proj.id]?.edit || false}
                                                onChange={() => {
                                                    handleActionCheckboxChange(proj.id, 'edit');
                                                    // handleEditProject(proj);
                                                }}
                                            /> Edit
                                            <Checkbox
                                                checked={project.actionCheckboxes[proj.id]?.delete || false}
                                                onChange={() => {
                                                    handleActionCheckboxChange(proj.id, 'delete'); 
                                                    // handleDeleteProject(proj);
                                                }}
                                            /> Delete
                                            <Checkbox
                                                checked={project.actionCheckboxes[proj.id]?.view || false}
                                                onChange={() => {
                                                    handleActionCheckboxChange(proj.id, 'view');
                                                    // handleShowProjectDetail(proj)
                                                }}
                                            /> View
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-center item-center">
                                <Button onClick={moveToAvailable} variant='contained'>Back Move</Button>
                                <Button onClick={handleSaveEdit} variant='contained'>Save</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="absolute top-0 right-0 m-4 rotate-45 text-red-600" onClick={handleCloseModal}>
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <h3 className="text-xl font-semibold mb-2">Add a New Project</h3>
                        <input
                            type="text"
                            value={project.newProject}
                            onChange={(e) => setProject({ ...project, newProject: e.target.value })}
                            placeholder="Project Title"
                            className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        />
                        <textarea
                            value={project.newProjectDescription}
                            onChange={(e) => setProject({ ...project, newProjectDescription: e.target.value })}
                            placeholder="Project Description"
                            className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        />
                        <Button
                            onClick={handleAddProject}
                            variant='contained'
                            startIcon={<SaveIcon />}
                        >
                            Add Project
                        </Button>
                    </div>
                </div>
            </div>
            {project.selectedProject && (
                <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-30'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-2xl font-bold mb-4'>{project.selectedProject.title}</h2>
                        <p>{project.selectedProject.description}</p>
                        <div className='flex justify-end mt-4'>
                            <Button
                                variant="contained"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => setProject((prevProject) => ({ ...prevProject, selectedProject: null }))}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {project.editingProject && (
                <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-30'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h3 className='text-2xl font-bold mb-4'>Edit Project</h3>
                        <input
                            type="text"
                            value={project.editProjectTitle}
                            onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectTitle: e.target.value }))}
                            className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        />
                        <textarea
                            value={project.editProjectDescription}
                            onChange={(e) => setProject((prevProject) => ({ ...prevProject, editProjectDescription: e.target.value }))}
                            className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="contained"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleSaveEdit}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => setProject((prevProject) => ({ ...prevProject, editingProject: null }))}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}





// import React, { useEffect, useState } from 'react';
// import { Button, Checkbox } from '@mui/material';
// import { CrossIcon, DeleteIcon, PencilIcon, SaveIcon } from 'lucide-react';

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
//                                 <div key={ind} className="flex items-center mb-2">
//                                     <Checkbox
//                                         checked={project.selectedProjectsForMove.some((p) => p.id === proj.id)}
//                                         onChange={() => handleCheckboxChange(proj, false)}
//                                     />
//                                     <span className="flex-1">{proj.title}</span>
//                                 </div>
//                             ))}
//                             <div className="flex justify-center item-center">
//                                 <Button onClick={moveToDone} variant='contained'>Move</Button>
//                             </div>
//                         </div>
//                         <div className="w-1/2 p-2">
//                             <h3 className="text-xl text-center font-semibold mb-2">Done Projects</h3>
//                             {project.doneProjects.map((proj, index) => (
//                                 <div key={index} className="flex flex-col items-center mb-2">
//                                     <div className="flex gap-2 items-center">
//                                     <Checkbox
//                                         checked={project.selectedDoneProjectsForMove.some((p) => p.id === proj.id)}
//                                         onChange={() => handleCheckboxChange(proj, true)}
//                                     />
//                                         <span className="flex-1">{proj.title}</span>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button
//                                             onClick={() => handleEditProject(proj)}
//                                             variant='outlined'
//                                             startIcon={<PencilIcon />}
//                                         >
//                                             Edit
//                                         </Button>
//                                         <Button
//                                             onClick={() => handleDeleteProject(proj)}
//                                             variant='outlined'
//                                             startIcon={<DeleteIcon />}
//                                         >
//                                             Delete
//                                         </Button>
//                                         <Button
//                                             onClick={() => handleShowProjectDetail(proj)}
//                                             variant='outlined'
//                                             startIcon={<SaveIcon />}
//                                         >
//                                             View
//                                         </Button>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="flex justify-center item-center">
//                                 <Button onClick={moveToAvailable} variant='contained'>Move Back</Button>
//                                 <Button onClick={handleSaveEdit} variant='contained'>Save</Button>
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
