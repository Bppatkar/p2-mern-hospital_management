import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });

  const fetchPatient = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/patients/${id}`
      );
      const { name, email, phoneNumber, dateOfBirth, address } = response.data;
      setFormData({
        name,
        email,
        phoneNumber,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth).toISOString().split("T")[0]
          : "",
        address,
      });
    } catch (err) {
      console.error("Error fetching patient:", err);
      setError("Failed to fetch patient details.");
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/patients/update/${id}`,
        formData
      );
      navigate("/patients");
    } catch (error) {
      setError(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Update Patient
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phoneNumber", "address"].map((field) => (
          <div key={field} className="space-y-2">
            <label
              htmlFor={field}
              className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            >
              {field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
        <div className="space-y-2">
          <label
            htmlFor="dateOfBirth"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
