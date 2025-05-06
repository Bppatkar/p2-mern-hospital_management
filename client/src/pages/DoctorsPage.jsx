import React from "react";
import { Link } from "react-router-dom";
import DoctorList from "../components/Doctor/DoctorList.jsx";

const DoctorsPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Doctors List</h1>
        <Link
          to="/doctors/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          Add Doctor
        </Link>
      </div>
      <DoctorList />
    </div>
  );
};

export default DoctorsPage;
