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
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : "",
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
    <div className="container mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4">Update Patient</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        {["name", "email", "phoneNumber", "address"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
