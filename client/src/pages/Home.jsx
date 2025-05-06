import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-6 md:px-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Clinic Management Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Your central hub for managing patients, doctors, and appointments
          efficiently.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          to="/patients"
          className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11a2 2 0 012-2m14 0h-3"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Manage Patients
              </h3>
              <p className="text-gray-600">
                View and manage patient records, including appointments and
                medical history.
              </p>
            </div>
          </div>
        </Link>
        <Link
          to="/doctors"
          className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h2H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2M9 13h2a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2zm0-2h2V7H7V5a2 2 0 012-2h2v7zM11 5a2 2 0 012-2h2a2 2 0 012 2v7h-2v-5zM15 5v2h2v3h-2v-3h-2V5z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Manage Doctors
              </h3>
              <p className="text-gray-600">
                View and manage doctor records, including specialties and
                availability.
              </p>
            </div>
          </div>
        </Link>
        <Link
          to="/appointments"
          className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Manage Appointments
              </h3>
              <p className="text-gray-600">
                View and manage appointments, including scheduling and
                rescheduling.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
