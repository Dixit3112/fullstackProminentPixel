import React, { useState } from 'react'
// import UserTable from './UserDataTableByShadCN-UI'
import CalendarDashModal from './ModalEditing'
import EmployeeDetailModal from './EmployeeDetailModal'
// import ToDoList from './ToDoList'
import NestedModal from '../ui/nestedModal'
import ProjectFile from './ProjectFile'

// import EventModal from './eventModal'
import { Button } from '@mui/material'

export default function Home() {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleModalOpen = () => {
        setIsOpenModal(!isOpenModal)
    }

    // const cartItems = [
    //     {
    //         id: 1,
    //         name: "Apple",
    //         price: 100,
    //         quantity: 5
    //     },
    //     {
    //         id: 2,
    //         name: "Orange",
    //         price: 200,
    //         quantity: 10
    //     },
    //     {
    //         id: 3,
    //         name: "Banana",
    //         price: 300,
    //         quantity: 15
    //     }
    // ]
    // const totalPrice = cartItems.reduce((acc, item) => {
    //     return (
    //         <p className='flex gap-2'><span>{acc}</span>:<span> {item.name} </span>-<span>{item.quantity}</span>
    //             {/* <p className="flex"><span>{curr}</span>:<span> {item.name} </span>-<span>{item.quantity}</span></p> */}
    //         </p>
    //     );
    // }, 1)

    return (
        <div className='homePage'>
            <div className="container">
                <div className="Container">
                    <h1 className='text-5xl underline pb-5 text-center'>Home</h1>
                    {/* <div className="relative isolate px-6 lg:px-8">
                        <div className="mx-auto w-full sm:py-48 lg:py-[5px] h-[69.8vh]">
                            <table className='mx-auto my-5'>
                                <tr className=' mb-10'>
                                    <th className='text-2xl w-36'>Item</th>
                                    <th className='text-2xl w-36'>Price</th>
                                    <th className='text-2xl w-36'>Quantity</th>
                                </tr>
                                {
                                    cartItems.map((item) => (
                                        <tr key={item.id} className='mb-3'>
                                            <td className='text-2xl'>{item.name}</td>
                                            <td className='text-2xl'>{item.price}</td>
                                            <td className='text-2xl'>{item.quantity}</td>
                                        </tr>
                                    ))
                                }
                                {
                                    cartItems.map((item) => {
                                        <tr key={item.id} >
                                            <td>{item.name} :&nbsp; {item.price}&nbsp; * &nbsp;{item.quantity} </td>
                                        </tr>
                                    })
                                }
                            </table>
                            <h2 className='text-3xl flex items-center h-24 gap-5'> Total Price: <span className="text-xl text-blue-300">{totalPrice}</span></h2>
                        </div>
                    </div> */}
                    {/* <div className="w-full mx-auto">
                        <ToDoList />
                    </div> */}
                    {/* <div className="w-full mx-auto flex justify-center items-center m-5">
                        <Button className='bg-blue-800 text-blue-950 text-xl' variant='outlined' onClick={handleModalOpen}>Open old Project</Button>
                        {isOpenModal && <ProjectFiles />}
                    </div> */}
                    <div className="w-full mx-auto flex justify-center items-center m-5">
                        <Button className='bg-blue-800 text-blue-950 text-xl' variant='outlined' onClick={handleModalOpen}>Open Project</Button>
                        {isOpenModal && <ProjectFile />}
                    </div>
                    {/* <div className="w-full flex gap-4 flex-col justify-center items-center mb-10">
                        <button onClick={handleModalOpen} className='p-1 max-w-52 rounded-xl bg-green-800 text-white hover:bg-green-600 border-0 text-xl'>Open Modal</button>
                        {isOpenModal && <TaskModalBox />}
                    </div> */}
                    <div className="w-full mx-auto">
                        <EmployeeDetailModal />
                    </div>
                    <div className="w-full mx-auto">
                        <CalendarDashModal />
                    </div>
                    <div className="w-full mx-auto">
                        <NestedModal />
                    </div>
                </div>
            </div>
        </div>
    )
}


