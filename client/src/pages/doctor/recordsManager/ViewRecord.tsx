import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from '@/common/config.ts';
import axios from "axios";
import CustomAlertModal from "@/components/modals/CustomAlertModal";
import EditRecordModal from "@/components/modals/doctor/EditRecordModal";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface Record {
  record_id: number;
  patient_name: string;
  patient_age: number;
  patient_dob: string;
  patient_gender: string;
  visit_date: string;
  purpose: string;
  diagnosis: string;
  prescription: string;
  record_status: string;
}

const ViewRecord: React.FC = () => {
  const { recordId } = useParams<{ recordId: string | undefined }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<Record | null>(null);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  useEffect(() => {
    if (doctorId && recordId) {
      // Ensure both IDs are defined before fetching
      fetchRecord(doctorId, recordId);
    } else {
      console.error("Doctor ID or Record ID is undefined");
    }
  }, [doctorId, recordId]); // React to changes in either doctorId or recordId

  const fetchRecord = async (doctorId: number, recordId: string) => {
    try {
      const response = await axios.get(
        `${config.API}/api/records/view/doctor/${doctorId}/record/${recordId}`
      );
      setRecord(response.data);
    } catch (error) {
      console.error("Error fetching record details", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShowAlertModal = () => {
    setShowAlertModal(true);
  };
  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const handleDeleteRecord = async (recordId: string) => {
    try {
      const response = await axios.delete(
        `${config.API}/api/records/delete/${doctorId}/${recordId}`
      );
      if (response.status === 200) {
        navigate("/doctor/doctorrecords");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Failed to delete record:", error);
      alert("Failed to delete the record.");
    }
    setShowAlertModal(false);
  };

  // const handleRecordUpdate = (updatedRecord: Record) => {
  //   setRecord(updatedRecord);  // Update the local state with the new record data
  // };

  return (
    <div className="animate-fade-in p-5">
      {/* top buttons */}
      <section className="flex justify-between mb-4">
        <h3
          id="back-button"
          className="text-primary cursor-pointer py-[1%] font-bold flex items-center xl:max-2xl:text-[1.2em] xl:max-2xl:py-[0.5%]"
          onClick={() => navigate("/doctor/doctorrecords")}
        >
          <AiOutlineArrowLeft className="text-black hover:text-primary" />
          Back to Appointment Records
        </h3>
        <div>
          <button
            id="delete-button"
            className="mb-2 mr-2 px-4 py-2 bg-alert text-white hover:bg-red-500  rounded-lg font-bold"
            onClick={handleShowAlertModal}
          >
            Delete Record
          </button>
          <button
            id="edit-button"
            className="mb-2 px-4 py-2 bg-primarydark text-white hover:bg-primarycolor hover:text-primarylight rounded-lg font-bold"
            onClick={() => setShowEditModal(true)}
          >
            Edit Record
          </button>
        </div>
      </section>
      {/* Main content */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        {/* record id and status */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Viewing Record ID: {record ? record.record_id : "Loading..."}
          </h2>
          {record && (
            <div>
              <span className="text-2xl font-semibold">
                Appointment Status:{" "}
              </span>
              <span
                className={`px-4 py-1 rounded-lg font-semibold text-sm ${
                  record.record_status === "Pending"
                    ? "bg-pending text-yellow-800"
                    : record.record_status === "Complete"
                    ? "bg-complete text-green-800"
                    : record.record_status === "Ongoing"
                    ? "bg-ongoing text-blue-800"
                    : record.record_status === "Cancelled"
                    ? "bg-cancelled text-red-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {record.record_status}
              </span>
            </div>
          )}
        </div>

        <hr className="mb-6" />

        {/* Patient and Appointment Details */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-6">
          {/* Patient Details Column */}
          <div className="md:w-1/2 py-4 px-20">
            <h3 className="font-semibold text-lg mb-2 py-2 px-4 w-[50%] rounded-xl bg-primary text-white">
              Patient Details
            </h3>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Patient Name:</span>{" "}
              <span>{record ? record.patient_name : "Loading..."}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Patient Age:</span>{" "}
              <span>{record ? record.patient_age : "Loading..."}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Date of Birth:</span>{" "}
              <span>
                {record ? formatDate(record.patient_dob) : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Patient Gender:</span>{" "}
              <span>{record ? record.patient_gender : "Loading..."}</span>
            </div>
          </div>

          {/* Appointment Details Column */}
          <div className="md:w-1/2 py-4 px-20">
            <h3 className="font-semibold text-lg mb-2 py-2 px-4 w-[70%] rounded-xl bg-primary text-white">
              Appointment Details
            </h3>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Visit Date:</span>{" "}
              <span>
                {record ? formatDate(record.visit_date) : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Purpose:</span>{" "}
              <span>{record ? record.purpose : "Loading..."}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Diagnosis:</span>{" "}
              <span>{record ? record.diagnosis : "Loading..."}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Prescription:</span>{" "}
              <span>{record ? record.prescription : "Loading..."}</span>
            </div>
          </div>
        </div>
      </section>
      <CustomAlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        title="Confirm Deletion"
        description="Are you sure you want to delete this record? This action cannot be undone."
        buttonOneText="Cancel"
        buttonOneOnClick={handleCloseAlertModal}
        buttonTwoText="Delete"
        buttonTwoOnClick={() => {
          if (recordId) {
            handleDeleteRecord(recordId);
          } else {
            alert("Error: Record ID is missing.");
          }
        }} // Correctly use the `recordId` from your state or props
      />
      <EditRecordModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        record={record}
        doctorId={doctorId} // Assuming doctorId is available; you might need to fetch or pass this as well
      />
    </div>
  );
};

export default ViewRecord;
