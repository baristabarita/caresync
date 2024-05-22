import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "@/util/axiosInstance";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBook, FaSignOutAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";

interface DoctorSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (!isSidebarOpen) {
      toggleSidebar(); // Close sidebar when navigating if it's not open
    }
  };

  const handleLogout = async () => {
    try {
      // Make API call to backend to invalidate the session using the custom Axios instance
      await axios.post("/auth/logout");
      // Clear local storage of the accessToken
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isPathActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div
      className={`h-screen fixed bg-primarydark text-[#B1B1B1] text-[1.2em] font-semibold p-4 flex flex-col items-start ${
        isSidebarOpen ? "w-60" : "w-16"
      } transition-all duration-300 ease-in-out`}
    >
      <div
        className={`mb-5 cursor-pointer flex items-center ${
          isPathActive("/doctor") && !isPathActive("/doctor/doctorrecords") && !isPathActive("/doctor/doctorsettings")
            ? "text-primarylight rounded"
            : "hover:text-primarylight"
        }`}
        onClick={() => handleNavigation("/doctor")}
      >
        <BiSolidDashboard className={`mr-2`} />
        {isSidebarOpen && "Dashboard"}
      </div>
      <div
        className={`mb-5 cursor-pointer flex items-center ${
          isPathActive("/doctor/doctorrecords")
            ? "text-primarylight rounded"
            : "hover:text-primarylight"
        }`}
        onClick={() => handleNavigation("/doctor/doctorrecords")}
      >
        <FaBook className={`mr-2`} />
        {isSidebarOpen && "Appointments"}
      </div>
      <div
        className={`mb-5 cursor-pointer flex items-center ${
          isPathActive("/doctor/doctorsettings")
            ? "text-primarylight rounded"
            : "hover:text-primarylight"
        }`}
        onClick={() => handleNavigation("/doctor/doctorsettings")}
      >
        <BsFillGearFill className={`mr-2`} />
        {isSidebarOpen && "Account Settings"}
      </div>
      <div
        className={`fixed bottom-[5%] ml-2 w-[15%] cursor-pointer flex items-center hover:text-primarylight`}
        onClick={handleLogout}
      >
        <FaSignOutAlt className={`mr-2 mt-1`} />
        {isSidebarOpen && "Logout"}
      </div>
    </div>
  );
};

export default DoctorSidebar;
