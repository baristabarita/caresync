import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '@/common/config.ts';
import axios from 'axios';
import CustomConfirmationModal from '@/components/modals/CustomConfirmationModal';

interface AddRecordFormState {
    patient_name: string;
    patient_age: string; // Handled as string for form handling, convert to number on submit
    patient_dob: string;
    patient_gender: string;
    visit_date: string;
    purpose: string;
    diagnosis: string;
    prescription: string;
    record_status: string;
}

const AddRecordForm: React.FC = () => {
    const navigate = useNavigate();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formData, setFormData] = useState<AddRecordFormState>({
        patient_name: '',
        patient_age: '',
        patient_dob: '',
        patient_gender: '',
        visit_date: '',
        purpose: '',
        diagnosis: '',
        prescription: '',
        record_status: 'Pending',
    });
    const [doctorId, setDoctorId] = useState<number | null>(null);
    useEffect(() => {
        const userDetailsString = localStorage.getItem("user");
        if (userDetailsString) {
          try {
            const userDetails = JSON.parse(userDetailsString);
            setDoctorId(userDetails.doctorId);
          } catch (error) {
            console.error("Error parsing user details from localStorage:", error);
          }
        }
    }, []);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(`Field changed - ${name}: ${value}`); // Add this to debug
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const openConfirmModal = () => {
      setShowConfirmationModal(true);
    }

    const handleFormSubmit = async () => {
        if (!doctorId) {
            alert("Doctor ID is missing. Please log in again.");
            return;
        }
        const submitData = {
            ...formData,
            patient_age: parseInt(formData.patient_age),
            doctor_id: doctorId,
        };
        console.log('Submitting data:', submitData); // Log data being submitted
    
        try {
            const response = await axios.post(`${config.API}/api/records/add`, submitData);
            if (response.status === 201) { //status 201 if successfully created in backend
                alert('Record added successfully!');
                navigate('/doctor/doctorrecords');
            } else {
                throw new Error('Failed to add record');
            }
        } catch (error) {
            console.error('Error adding record:', error);
            alert('Error adding record');
        }
    };
    


    return (
        <div className="animate-fade-in font-roboto">
          <div className="container w-[60%] mx-auto px-5 py-4">
            <form onSubmit={(event) => { event.preventDefault(); openConfirmModal(); }}>
              <div className="bg-white rounded-lg shadow-lg drop-shadow-lg">
                <h1 className="text-2xl font-bold text-center mt-0 rounded-t-lg bg-primarylight text-primarydark p-4">Create New Record</h1>
                <div className="flex flex-col gap-4 px-5 mt-4 mb-5">
                  <label htmlFor="patient_name">Patient Name</label>
                  <input type="text" id="patient_name" name="patient_name" value={formData.patient_name} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="patient_age">Patient Age</label>
                  <input type="number" id="patient_age" name="patient_age" value={formData.patient_age} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="patient_dob">Patient DOB</label>
                  <input type="date" id="patient_dob" name="patient_dob" value={formData.patient_dob} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="patient_gender">Patient Gender</label>
                    <select
                    id="patient_gender"
                    name="patient_gender"
                    value={formData.patient_gender}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 border border-gray-300 rounded p-2"
                    required
                    >
                        <option value="">Select Gender</option>  // Ensure this is non-selectable or handled if it remains as default
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>


    
                  <label htmlFor="visit_date">Visit Date</label>
                  <input type="date" id="visit_date" name="visit_date" value={formData.visit_date} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="purpose">Purpose</label>
                  <input type="text" id="purpose" name="purpose" value={formData.purpose} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="diagnosis">Diagnosis</label>
                  <input type="text" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="prescription">Prescription</label>
                  <input type="text" id="prescription" name="prescription" value={formData.prescription} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required />
    
                  <label htmlFor="record_status">Record Status</label>
                  <select id="record_status" name="record_status" value={formData.record_status} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-300 rounded p-2" required>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-center py-4">
                  <button type="button" onClick={() => navigate("/doctor/doctorrecords")} className="bg-alert hover:bg-red-600 text-white p-2 rounded">Cancel</button>
                  <button type="submit" className="bg-primary hover:bg-primarydark text-white p-2 rounded ml-4">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <CustomConfirmationModal
            isOpen = {showConfirmationModal}
            onClose = { () => setShowConfirmationModal(false)}
            title = "Adding New Appointment Record"
            description = "Are you sure you want to add this new record?"
            buttonOneText = "Cancel"
            buttonOneOnClick = { () => setShowConfirmationModal(false) }
            buttonTwoText = "Confirm"
            buttonTwoOnClick = {handleFormSubmit}
          />
        </div>
      );
}

export default AddRecordForm