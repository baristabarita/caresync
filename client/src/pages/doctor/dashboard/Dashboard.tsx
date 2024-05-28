import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorLineChart from "@/components/charts/doctor/DoctorLineChart";
import DoctorPieChart from "@/components/charts/doctor/DoctorPieChart";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHourglass, FaUserFriends, FaBookMedical } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
//import { LuUserX } from "react-icons/lu";

interface User {
  doctorId: number;
  fname: string;
  lname: string;
  profession: string;
  contactNumber: string;
  emailAddress: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [pendingAppointments, setPendingAppointments] = useState([
    {
      id: "PT121",
      patient_name: "Jojo Satoru",
      gender: "Male",
      reason: "Waste Pain",
      sent_date: "2024-04-04",
    },
    {
        id: "PT122",
        patient_name: "Gawr Gura",
        gender: "Female",
        reason: "Migraines",
        sent_date: "2024-04-08",
      },
      {
        id: "PT123",
        patient_name: "Ashley Kane",
        gender: "Female",
        reason: "Loss of voice",
        sent_date: "2024-04-09",
      },
      
  ]);

  useEffect(() => {
    const userDetailsString = localStorage.getItem("user");
    if (userDetailsString) {
      try {
        const userDetails = JSON.parse(userDetailsString);
        setUser(userDetails);
        setPendingAppointments([
          {
            id: "PT121",
            patient_name: "Jojo Satoru",
            gender: "Male",
            reason: "Waste Pain",
            sent_date: "2024-04-04",
          },
          {
              id: "PT122",
              patient_name: "Gawr Gura",
              gender: "Female",
              reason: "Migraines",
              sent_date: "2024-04-08",
            },
            {
              id: "PT123",
              patient_name: "Ashley Kane",
              gender: "Female",
              reason: "Loss of voice",
              sent_date: "2024-04-09",
            },
            
        ])
      } catch (error) {
        console.error("Error parsing user details from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("user");
        navigate("/"); // Navigate to login on error
      }
    } else {
      navigate("/"); // Navigate to login if no user details
    }
  }, [navigate]);

  const monthlyAppointments = [
    {
      id: "Appointments",
      data: [
        { x: "2023-01-01", y: 20 },
        { x: "2023-02-01", y: 37 },
        { x: "2023-03-01", y: 50 },
        { x: "2023-04-01", y: 39 },
        { x: "2023-05-01", y: 55 },
        { x: "2023-06-01", y: 60 },
        { x: "2023-07-01", y: 50 },
        { x: "2023-08-01", y: 63 },
        { x: "2023-09-01", y: 34 },
        { x: "2023-10-01", y: 40 },
        { x: "2023-11-01", y: 30 },
        { x: "2023-12-01", y: 41 },
      ],
    },
  ];
  const pieData = [
    {
      id: "Female",
      label: "Female",
      value: 120,
    },
    {
      id: "Male",
      label: "Male",
      value: 80,
    },
  ];

  return (
    <div className="flex-col animate-fade-in mx-8">
      <div className="mt-4 flex text-[2em] text-primarycolor font-bold items-center">
        <BiSolidDashboard className="mx-3" /> Welcome, Dr.{" "}
        {user ? `${user.lname}` : "Guest"}!
      </div>

      {/* Count boxes */}
      <section className="h-[30vh] flex overflow-x-auto rounded-lg">
        <div className="flex flex-row gap-4 items-center justify-between w-full mx-auto mt-2">
          {/* Box 1 - TOTAL APPOINTMENTS */}
          <div className="bg-white h-[24vh] w-[37vh] rounded-2xl flex justify-between shadow-lg drop-shadow-lg items-center p-4">
            <div className="flex flex-col">
              <p className="text-black font-bold text-left xl:text-[0.8em]">
                TOTAL APPOINTMENTS
              </p>
              <p className="text-primarycolor text-[3em] font-bold xl:text-[2em]">
                105
              </p>
            </div>
            <div className="bg-appointment bg-opacity-20 rounded-full p-4">
              <FaBookMedical className="text-appointment text-[3em]" />
            </div>
          </div>
          {/* Box 2 - TOTAL PATIENTS */}
          <div className="bg-white h-[24vh] w-[37vh] rounded-2xl flex justify-between shadow-lg drop-shadow-lg items-center p-4">
            <div className="flex flex-col">
              <p className="text-black font-bold text-left xl:text-[0.8em]">
                TOTAL PATIENTS
              </p>
              <p className="text-primarycolor text-[3em] font-bold xl:text-[2em]">
                350
              </p>
            </div>
            <div className="bg-complete bg-opacity-20 rounded-full p-4">
              <FaUserFriends className="text-complete text-[3em]" />
            </div>
          </div>
          {/* Box 3 - PENDING APPOINTMENTS */}
          <div className="bg-white h-[24vh] w-[37vh] rounded-2xl flex justify-between shadow-lg drop-shadow-lg items-center p-4">
            <div className="flex flex-col">
              <p className="text-black font-bold text-left xl:text-[0.8em]">
                PENDING APPOINTMENTS
              </p>
              <p className="text-primarycolor text-[3em] font-bold xl:text-[2em]">
                20
              </p>
            </div>
            <div className="bg-pending bg-opacity-20 rounded-full p-4">
              <FaHourglass className="text-pending text-[3em]" />
            </div>
          </div>
          {/* Box 4 - TOTAL EARNING */}
          <div className="bg-white h-[24vh] w-[37vh] rounded-2xl flex justify-between shadow-lg drop-shadow-lg items-center p-4">
            <div className="flex flex-col">
              <p className="text-black font-bold text-left xl:text-[0.8em]">
                TOTAL REVENUE THIS MONTH
              </p>
              <p className="text-primarycolor text-[3em] font-bold xl:text-[1.5em]">
                ₱ 50,000
              </p>
            </div>
            <div className="bg-bills bg-opacity-20 rounded-full p-4">
              <FaMoneyBills className="text-bills text-[3em]" />
            </div>
          </div>
        </div>
      </section>

      {/* Line Chart for statistics */}
      <section className="container mt-5 bg-white rounded-md shadow-lg drop-shadow-lg ">
        <div className="flex items-center justify-between py-2 px-4 border-b-2">
          <h2 className="text-[1.5em] font-bold">
            Monthly Appointment Statistics
          </h2>
        </div>
        <div className="h-[50vh] mx-5 -5">
          <DoctorLineChart data={monthlyAppointments} />
        </div>
      </section>

      {/* Pending appointments table and Pie Chart statistics */}
      <section className="h-[50vh] flex overflow-auto mt-5">
        {/* Pending Appointments */}
        <div className="w-full lg:w-[49%] text-center bg-white flex-col pt-0 rounded-lg overflow-auto shadow-lg drop-shadow-lg m-2">
          <div className="text-left">
            <p className="bg-pending text-primarycolor rounded-t-lg font-semibold text-xl px-5 py-2">
              Pending Appointmennts
            </p>
          </div>
          <div className="px-5 py-2">
            <table className="w-full text-primarycolor text-left">
              <thead>
                <tr className="text-sm font-semibold">
                  <th className="py-2">Patient Name</th>
                  <th>Gender</th>
                  <th>Reason</th>
                  <th>Request Sent Date</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments.map((appointment) => (
                  <tr key={appointment.id} className="text-sm">
                    <td className="py-2">{appointment.patient_name}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.sent_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* pie chart Gender Demographics Statistics */}
        <div className="w-full lg:w-[49%] text-center bg-white rounded-lg flex-col pt-0 overflow-auto shadow-lg drop-shadow-lg m-2">
          <div className="text-left bg-white">
            <p className="font-semibold bg-complete text-xl px-5 py-2">
              Gender Demographics Statistics
            </p>
          </div>
          <div className="h-[40vh] mx-10 pb-5">
            <DoctorPieChart data={pieData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
