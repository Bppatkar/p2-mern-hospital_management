import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/doctors`
      );
      setDoctors(response.data);
    } catch (err) {
      setError("Error fetching doctors");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this doctor?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/doctors/delete/${id}`
        );
        fetchDoctors();
      } catch {
        setError("Error deleting doctor");
      }
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Doctor List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "Email", "Specialization", "Phone", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((doc) => (
                <tr key={doc._id}>
                  <td className="px-6 py-3">{doc.name}</td>
                  <td className="px-6 py-3">{doc.email}</td>
                  <td className="px-6 py-3">{doc.specialization}</td>
                  <td className="px-6 py-3">{doc.phoneNumber}</td>
                  <td className="px-6 py-3 space-x-3">
                    <Link
                      to={`/doctors/update/${doc._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(doc._id)}
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
    </div>
  );
};

export default DoctorList;
