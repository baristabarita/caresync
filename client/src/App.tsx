import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* General Pages */
import DoctorLogin from "./pages/doctor/login/DoctorLogin";
import DoctorRegister from "./pages/doctor/register/DoctorRegister";

/* Doctor Pages */
import DoctorLayout from "./components/layout/DoctorLayout.tsx";
import DoctorDashboard from "./pages/doctor/dashboard/Dashboard.tsx";
import RecordsPage from "./pages/doctor/recordsManager/RecordsManager.tsx";
import ViewRecordPage from "./pages/doctor/recordsManager/ViewRecord.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Pages Routes*/}
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/docregister" element={<DoctorRegister />} />

        {/* Doctor Page Routes */}
        <Route path="doctor" element={<DoctorLayout />}>
          <Route index path="doctordash" element={<DoctorDashboard />} />
          <Route path="doctorrecords" element={<RecordsPage />} />
          <Route path="doctorrecords/record" element={<ViewRecordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
