import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DoctorNavbar from '../navbar/DoctorNavbar'
import DoctorSidebar from '../sidebar/DoctorSidebar';

const DoctorLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return(
        <div className='flex flex-col h-screen animate-fade-in overflow-hidden'>
            <DoctorNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            <div className='flex flex-1 overflow-x-hidden overflow-y-auto bg-bgcolor transition-all duration-300 ease-in-out'>
                <DoctorSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div
                    className={`flex-1 transition-all duration-300 ease-in-out font-roboto ${isSidebarOpen ? 'ml-[20%] mr-[4%] w-[76%]' : 'ml-[7%] mr-[4%] w-[81%]'
                        }`}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DoctorLayout