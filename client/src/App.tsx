import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuth from "./util/userAuth";

/* General Pages */
import DoctorLogin from "./pages/doctor/login/DoctorLogin";
import DoctorRegister from "./pages/doctor/register/DoctorRegister";

/* Doctor Pages */
import DoctorLayout from "./components/layout/DoctorLayout";
import DoctorDashboard from "./pages/doctor/dashboard/Dashboard";
import RecordsPage from "./pages/doctor/recordsManager/RecordsManager";
import AddRecordForm from "./pages/doctor/recordsManager/AddRecordForm";
import ViewRecordPage from "./pages/doctor/recordsManager/ViewRecord";
import DoctorSettings from "./pages/doctor/settings/DoctorSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Pages Routes*/}
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/docregister" element={<DoctorRegister />} />

        {/* Doctor Page Routes */}
        <Route path="doctor" element={<UserAuth><DoctorLayout /></UserAuth>}>
          <Route index element={<DoctorDashboard />} /> {/* localhost/doctor */}
          <Route path="doctorrecords" element={<RecordsPage />} /> {/* localhost/doctor/doctorrecords */}
          <Route path="doctorrecords/addrecord" element={<AddRecordForm />} /> {/* localhost/doctor/doctorrecords/addrecord */}
          <Route path="doctorrecords/record/:recordId" element={<ViewRecordPage />} /> {/* localhost/doctor/doctorrecords/record */}
          <Route path="doctorsettings" element={<DoctorSettings />} /> {/* localhost/doctor/doctorsettings */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
