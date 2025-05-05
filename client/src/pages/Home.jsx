import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <div className="text-4xl font-bold text-blue-700 mb-6">
        Welcome to the Clinic Management Dashboard 🏥
      </div>
      <p className="text-gray-700 text-lg mb-8">
        Your central hub for managing patients, doctors, and appointments efficiently.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-lg mx-auto">
        <Link to="/patients" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-md shadow-md transition duration-300">
          Manage Patients
        </Link>
        <Link to="/doctors" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-md shadow-md transition duration-300">
          Manage Doctors
        </Link>
        <Link to="/appointments" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded-md shadow-md transition duration-300">
          Manage Appointments
        </Link>
        {/* You can add more links here for other sections if you have them */}
      </div>
      <div className="mt-12 text-gray-600">
        <p>Get started by navigating through the links above.</p>
        <p className="mt-2">This dashboard provides a streamlined way to organize your clinic's operations.</p>
      </div>
    </div>
  );
};

export default Home;