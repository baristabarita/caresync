import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/util/axiosInstance";
import Footer from "@/components/footer/Footer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "@/assets/icons/logo.png";
import background from "@/assets/images/logregbg.png";

interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  doctorId: number;
  fname: string;
  lname: string;
  profession: string;
  contactNumber: string;
  emailAddress: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

const DoctorLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrors([]); // Clear previous errors
    try {
      const response = await axiosInstance.post<LoginResponse>('/auth/login', formData);
      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user)); // Serialize user object
      navigate("/doctor"); // Navigate to the dashboard upon successful login
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set errors from response
      } else {
        setErrors(["Failed to login. Please check your credentials."]); // Fallback error
      }
      console.error('Login Error:', error.response?.data?.message || error.message);
    }
  };


  return (
    <div className="flex flex-col justify-between min-h-screen animate-fade-in">
      <div
        className="flex items-center justify-center flex-grow"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white bg-opacity-90 shadow-md rounded space-y-4 font-lato"
        >
          {errors.length > 0 && errors.map((error, index) => (
            <p key={index} className="text-alert text-center">{error}</p> // Display each error
          ))}
          <div className="text-center">
            <img
              src={logo}
              alt="CareSync Logo"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
              Welcome to CareSync!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your registered account to begin managing your
              records.
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors delay-250 duration-3000 ease-in"
          >
            Sign in
          </button>
          <div className="text-center text-sm mt-5">
            <span>Don't have an account? </span>
            <button name="register-button"><Link
              to="/docregister"
              className="font-bold hover:text-primary transition-colors delay-250 duration-3000 ease-in"
            >
              Register Here
            </Link>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorLogin;
