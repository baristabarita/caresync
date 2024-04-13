import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const DoctorLayout = () => {

    return(
        <>
            <h1>Doctor Layout</h1>
            <Outlet />
        </>
    )
}

export default DoctorLayout