import React from "react";
import { Link } from "react-router-dom";
import PatientList from "../components/Patients/PatientList.jsx";

const PatientsPage = () => {
  return (
    <div className="container mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Link
          to="/patients/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Patient
        </Link>
      </div>
      <PatientList />
    </div>
  );
};

export default PatientsPage;
