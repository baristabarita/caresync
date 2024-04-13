import React, { useState } from 'react';

const DoctorLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in with:', email, password);
    }
    //ui is subject to change
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Log in</button>
          </form>
        </div>
      );
};

export default DoctorLogin;