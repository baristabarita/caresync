import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from '@/common/config.ts';
import axios from 'axios';
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "@/assets/icons/logo.png";
import background from "@/assets/images/logregbg.png";
import Footer from "@/components/footer/Footer";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

// interface ErrorResponse {
//   errors: string[];
// }

const DoctorRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    profession: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrors([]);
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    try {
        // Make a POST request to the backend to register the user
        const response = await axios.post(`${config.API}/api/auth/register`, {
            fname: formData.firstName,
            lname: formData.lastName,
            profession: formData.profession,
            contact_number: formData.contact,
            email_address: formData.email,
            password: formData.password,
        });
        // Check response status and navigate or alert accordingly
        if (response.status === 201) {
            alert('Registration successful');
            navigate("/"); // Redirect to the doctor dashboard or login page
        }
      } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);      
      } else {
          // Fallback error message if the expected error structure isn't found
          setErrors(['An error occured. Please make sure that you placed your credentials correctly.']);
        }
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
          className="p-8 bg-white bg-opacity-90 shadow-md rounded space-y-4 font-lato my-3"
        >
           {/* Error display section */}
           {errors.length > 0 && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 mb-3">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className="text-center">
            <img
              src={logo}
              alt="CareSync Logo"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please fill in the information below:
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
          <label
              htmlFor="profession"
              className="block text-sm font-medium text-gray-700"
            >
              Profession
            </label>
            <input
                type="text"
                id="profession"
                name="profession"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={formData.profession}
                onChange={handleInputChange}
                required
              />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            </div>
            <div className="flex-1">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-500"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors delay-250 duration-3000 ease-in"
            >
              Register
            </button>
          </div>
          <div className="text-center text-sm mt-5">
            <span className="capitalize">Already have an account? </span>
            <Link
              to="/"
              className="text-black font-bold hover:text-primary transition-colors delay-250 duration-3000 ease-in"
            >
              Sign in Here
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorRegister;
