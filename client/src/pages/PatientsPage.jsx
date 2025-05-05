import React from "react";
import { Link } from "react-router-dom";
import PatientList from "../components/Patients/PatientList.jsx";

const PatientsPage = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <Link
          to="/patients/add"
          className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Add Patient
        </Link>
      </div>
      <PatientList />
    </div>
  );
};

export default PatientsPage;