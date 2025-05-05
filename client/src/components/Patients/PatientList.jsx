import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/patients`
      );
      // console.log("Patient List fetching: ", response.data);
      setPatients(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/patients/delete/${id}`
        );
        // Re-fetch patients after successful deletion
        fetchPatients();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete patient.");
      }
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4">Patient List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Date of Birth</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-2">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="border px-4 py-2">{patient.name}</td>
                  <td className="border px-4 py-2">{patient.email}</td>
                  <td className="border px-4 py-2">{patient.phoneNumber}</td>
                  <td className="border px-4 py-2">
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{patient.address}</td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/patients/update/${patient._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
