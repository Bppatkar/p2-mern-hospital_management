import React from "react";
import { Link } from "react-router-dom";
import DoctorList from "../components/Doctor/DoctorList.jsx";

const DoctorsPage = () => {
  return (
    <div  className="container mx-auto px-4 py-6">
      <DoctorList />
    </div>
  );
};

export default DoctorsPage;
