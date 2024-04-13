import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* General Pages */
import DoctorLogin from "./pages/doctor/login/DoctorLogin";
import DoctorRegister from "./pages/doctor/register/DoctorRegister";

/* Doctor Pages */
import DoctorLayout from "./components/layout/DoctorLayout";
import DoctorDashboard from "./pages/doctor/dashboard/Dashboard";
import RecordsPage from "./pages/doctor/recordsManager/RecordsManager";
import ViewRecordPage from "./pages/doctor/recordsManager/ViewRecord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Pages Routes*/}
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/docregister" element={<DoctorRegister />} />

        {/* Doctor Page Routes */}
        <Route path="doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="doctorrecords" element={<RecordsPage />} />
          <Route path="doctorrecords/record" element={<ViewRecordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
