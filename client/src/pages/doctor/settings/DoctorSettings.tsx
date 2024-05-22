import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '@/assets/images/defaultpfp.jpg'
import { BsFillGearFill } from "react-icons/bs";

interface User {
    doctorId: number;
    fname: string;
    lname: string;
    profession: string;
    contactNumber: string;
    emailAddress: string;
  }

const DoctorSettings: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const userDetailsString = localStorage.getItem("user");
        if (userDetailsString) {
          try {
            const userDetails = JSON.parse(userDetailsString);
            setUser(userDetails);
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

    return(
        <div className="animate-fade-in p-5">
            <section className="flex items-center mb-4 text-black">
                <BsFillGearFill className="text-3xl mr-2" />
                <h2 className="text-3xl font-bold">Account Settings</h2>
            </section>
            <section className="bg-white rounded-lg shadow-lg p-6">
                
                <div className="flex justify-start mb-6 border-b">
                    <h1 className="flex-1 py-2 border-b-2 font-bold border-primarydark text-primary">
                        User Details
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                     {/* Profile Image Column */}
                    <div className="md:col-span-1 flex flex-col items-center mb-4 md:mb-0">
                        <img src={defaultImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                        <label className="cursor-pointer bg-primarycolor text-white hover:bg-usertrucker p-2 rounded-lg">
                            Profile Image
                        </label>
                    </div>

                    {/* Personal and Account Information Columns */}
                    <div className="md:col-span-2">
                         {/* Personal Information */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-secondarycolor">First Name</label>
                            <input
                                className="form-input mt-1 block bg-gray-100 w-full border border-gray-300 rounded py-2 px-3"
                                placeholder="First Name"
                                name="fname"
                                value={user ? `${user.fname}` : "Guest First name"}
                            />
                        </div>
                        <div>
                            <label htmlFor="lname" className="block mt-4 text-sm font-medium text-secondarycolor">Last Name</label>
                            <input
                                className="form-input mt-1 block bg-gray-100 w-full border border-gray-300 rounded py-2 px-3"
                                placeholder="Last Name"
                                name="lname"
                                value={user ? `${user.lname}` : "Guest Last name"}
                            />
                        </div>
                        <div>
                            <label htmlFor="profession" className="block mt-4 text-sm font-medium text-secondarycolor">Profession</label>
                            <input
                                className="form-input mt-1 block bg-gray-100 w-full border border-gray-300 rounded py-2 px-3"
                                placeholder="Profession"
                                name="profession"
                                value={user ? `${user.profession}` : "Guest Profession"}
                            />
                        </div>
                    </div>

                    <div className='md:col-span-2 space-y-4'>
                    <div>
                            <label htmlFor="email" className="block text-sm font-medium text-secondarycolor">Email</label>
                            <input
                                className="form-input mt-1 block bg-gray-100 w-full border border-gray-300 rounded py-2 px-3"
                                placeholder="Email Address"
                                name="email"
                                value={user ? `${user.emailAddress}` : "Guest Email"}
                            />
                        </div>
                        <div>
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-secondarycolor">Contact Number</label>
                            <input
                                className="form-input mt-1 block bg-gray-100 w-full border border-gray-300 rounded py-2 px-3"
                                placeholder="Contact Number"
                                name="contactNumber"
                                value={user ? `${user.contactNumber}` : "Guest Profession"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DoctorSettings