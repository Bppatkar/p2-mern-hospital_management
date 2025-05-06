import React from "react";
import { Link } from "react-router-dom";
import PatientList from "../components/Patients/PatientList.jsx";

const PatientsPage = () => {
  return (
    <div className="container mx-auto my-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Patients</h1>
        <Link
          to="/patients/add"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Patient
        </Link>
      </div>
      <PatientList />
    </div>
  );
};

export default PatientsPage;
