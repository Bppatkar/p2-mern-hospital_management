import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    phoneNumber: "",
  });

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/doctors/${id}`
      );
      setFormData(response.data);
    } catch {
      setError("Failed to load doctor details.");
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/doctors/update/${id}`,
        formData
      );
      navigate("/doctors");
    } catch {
      setError("Update failed.");
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Doctor</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "specialization", "phoneNumber"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Doctor
        </button>
      </form>
    </div>
  );
};

export default UpdateDoctor;
