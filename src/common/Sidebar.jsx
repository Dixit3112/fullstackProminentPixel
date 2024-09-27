import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const isGenManager = user?.designation === 'General Manager';
  const isHOD = user?.designation === 'HOD';
  const isHR = user?.department === "HR" && (user?.designation === 'HOD' || user?.designation === 'Manager' || user?.designation === 'Asst. Manager');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="md:hidden fixed left-4 top-4 z-50">
        <button onClick={toggleSidebar}>
          <FaBars className="text-2xl text-gray-800" />
        </button>
      </div>
      <div className={`fixed left-0 top-0 h-full w-40 bg-gray-800 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="pt-20 flex flex-col items-center">
          <div className="sidebar pt-2 w-full border-t border-teal-100 flex flex-col gap-8 text-blue-300 pl-4">
            {isGenManager && <Link to={`/gm/${user.firstName}/dashboard`}>General Manager</Link>}
            {isHOD && <Link to={`/hod/${user.firstName}/dashboard`}>HOD</Link>}
            {isHR && <Link to={`/hr/${user.firstName}/dashboard`}>HR</Link>}
            <Link to={`/employee/${user.firstName}`}>Employee Profile</Link>
            {user && <Link to={`/${user.firstName}/punching`}>Punch In/Out</Link>}
            {(isGenManager || isHR) && <Link to="/signup">Register New Employee</Link>}
          </div>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
}

