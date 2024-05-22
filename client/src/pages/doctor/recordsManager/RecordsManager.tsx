import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from '@/common/config.ts';
import axios from "axios";
import { BiSolidBookBookmark } from "react-icons/bi";

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
  
  interface User {
    doctorId: number;
    fname: string;
    lname: string;
    profession: string;
    contactNumber: string;
    emailAddress: string;
  }

const RecordsManager: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  // States for filtering
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

    // Fetch user details and records
  useEffect(() => {
    const userDetailsString = localStorage.getItem("user");
    if (userDetailsString) {
      try {
        const userDetails: User = JSON.parse(userDetailsString);
        setUser(userDetails);
        if (userDetails.doctorId) {
          fetchRecords(userDetails.doctorId);
        }
      } catch (error) {
        console.error("Error parsing user details from localStorage:", error);
        localStorage.removeItem("user");
        navigate("/"); // Navigate to login on error
      }
    } else {
      navigate("/"); // Navigate to login if no user details
    }
  }, [navigate]);

  // Fetch records function
  const fetchRecords = async (doctorId: number) => {
    try {
      const response = await axios.get(`${config.API}/api/records/view/doctor/${doctorId}`);
      setRecords(response.data.map((record: Record) => ({
        ...record,
        visit_date: formatDate(record.visit_date)
      }))); // Format the date as soon as records are fetched
    } catch (error) {
      console.error("Failed to fetch records", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Status options for the dropdown
  const statusOptions = ["All", "Pending", "Ongoing", "Complete", "Cancelled"];
  // Function to filter bookings based on selected filters
  const getFilteredRecords = () => {
    return records.filter((record) => {
      const dateMatches = filterDate ? record.visit_date === filterDate : true;
      const statusMatches =
        filterStatus === "All" || filterStatus === ""
          ? true
          : record.record_status === filterStatus;
      return dateMatches && statusMatches;
    });
  };
  const totalPages = Math.ceil(getFilteredRecords().length / recordsPerPage);
  // Calculate the currently displayed bookings
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = getFilteredRecords().slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  // Function to navigate to the next and previous page
  const goToNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  // Function to determine if the next or previous buttons should be disabled
  const nextButtonDisabled = currentPage >= totalPages;
  const prevButtonDisabled = currentPage <= 1;

  // Add New Booking - Stub for demonstration (You might open a modal or navigate to a form)
  const handleNewRecord = () => {
    navigate("/doctor/doctorrecords/addrecord");
  };
  // Function to handle View Details navigation
  const handleViewDetails = (recordId: number) => {
    navigate(`/doctor/doctorrecords/record/${recordId}`);
};

  return (
    <div className="animate-fade-in p-5">
      <div className="flex items-center mb-4">
        <BiSolidBookBookmark className="text-3xl mr-2" />
        <h2 className="text-3xl font-bold">Appointment Records List</h2>
      </div>
      {/* Filter and  Add new Booking button*/}
      <section className="flex justify-between items-center">
        {/* filters*/}
        <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <span className="font-medium">Filter by:</span>
          <div>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="input input-bordered input-sm"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select select-bordered select-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* add new record button */}
        <div>
          <button
            onClick={handleNewRecord}
            className="btn btn-sm px-4 py-2 rounded-md bg-primary text-white hover:bg-primarydark hover:text-primarylight btn-primary"
          >
            Add New Record
          </button>
        </div>
      </section>
      {/* Table to display appointment records */}
      <section className="overflow-y-auto mt-4 bg-white rounded-lg drop-shadow-lg shadow-lg opacity-1">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-primarydark uppercase bg-primarylight">
            <tr>
              <th scope="col" className="py-3 px-6">
                Patient Name
              </th>
              <th scope="col" className="py-3 px-6">
                Age
              </th>
              <th scope="col" className="py-3 px-6">
                Visit Date
              </th>
              <th scope="col" className="py-3 px-6">
                Purpose
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((record) => (
                <tr
                  key={record.record_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6">{record.patient_name}</td>
                  <td className="py-4 px-6">{record.patient_age}</td>
                  <td className="py-4 px-6">{record.visit_date}</td>
                  <td className="py-4 px-6">{record.purpose}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center items-center">
                      <span
                        className={`inline-flex items-center justify-center font-bold rounded-full py-1 px-3 text-sm 
                                                ${
                                                  record.record_status ===
                                                  "Pending"
                                                    ? "bg-pending bg-opacity-30 text-orange-600"
                                                    : record.record_status ===
                                                      "Ongoing"
                                                    ? "bg-ongoing bg-opacity-30 text-blue-600"
                                                    : record.record_status ===
                                                      "Completed"
                                                    ? "bg-complete bg-opacity-30 text-green-600"
                                                    : record.record_status ===
                                                      "Cancelled"
                                                    ? "bg-cancelled bg-opacity-30 text-red-600"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                      >
                        {record.record_status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 flex justify-center items-center">
                    <button 
                    onClick={() => handleViewDetails(record.record_id)}
                    className="font-bold px-4 py-1 rounded-lg bg-primarylight text-primarydark hover:underline mr-2">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      {/* Pagination and Showing X of Y bookings */}
      <section className="flex justify-between items-center mt-4">
        <span className="text-gray-600 font-bold">
          Showing {currentRecords.length} of {records.length} bookings
        </span>
        <div className="flex">
          <button
            onClick={goToPreviousPage}
            disabled={prevButtonDisabled}
            className={`px-4 py-2 bg-white text-gray-800 font-semibold rounded-md border border-gray-400 hover:bg-gray-300 ${
              prevButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &#8592;
          </button>

          <div className="flex items-center justify-center">
            <span className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-md border border-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={nextButtonDisabled}
            className={`px-4 py-2 bg-white text-gray-800 font-semibold rounded-md border border-gray-400 hover:bg-gray-300 ${
              nextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &#8594;
          </button>
        </div>
      </section>
    </div>
  );
};

export default RecordsManager;
