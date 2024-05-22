import React, { useEffect, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import logo from "@/assets/icons/logo-title.png";

interface DoctorNavbarProps {
    toggleSidebar: () => void; 
    isSidebarOpen: boolean;    
  }

const DoctorNavbar: React.FC<DoctorNavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="bg-primarydark text-white p-4 flex justify-between items-center shadow-2xl">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-3xl ml-1 hover:text-primarylight"
        >
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className="h-10 ml-8" />
      </div>
      <div className="flex items-center">
        <div className="mr-6">
          <FaUserCircle className="text-2xl cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
