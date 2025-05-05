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
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Patient List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-center text-gray-600 font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {patient.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {patient.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
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
        </div>
      )}
    </div>
  );
};

export default PatientList;