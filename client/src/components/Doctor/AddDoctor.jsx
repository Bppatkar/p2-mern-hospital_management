import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/doctors/add`,
        formData
      );
      // console.log("Doctor added successfully:", formData);
      navigate("/doctors");
    } catch (err) {
      setError("Failed to add doctor. Try again.");
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Doctor</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "specialization", "phoneNumber", "experience"].map(
          (field) => (
            <div key={field} className="space-y-2">
              <label htmlFor={field} className="block font-medium capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          )
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
