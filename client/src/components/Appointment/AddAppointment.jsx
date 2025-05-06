import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    prescription: "",
    appointmentType: "consultation",
    status: "pending",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsRes, doctorsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/patients`),
          axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/doctors`),
        ]);
        // console.log("Patients response:", patientsRes?.data);
        // console.log("Doctors response:", doctorsRes?.data);

        setPatients(patientsRes?.data || []);
        setDoctors(doctorsRes?.data || []);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const selectedPatient = patients.find(
        (p) => p._id === formData.patientId
      );
      const selectedDoctor = doctors.find((d) => d._id === formData.doctorId);

      if (!selectedPatient || !selectedDoctor) {
        throw new Error("Please select both a patient and a doctor");
      }

      const appointmentData = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        patientName: selectedPatient.name,
        doctorName: selectedDoctor.name,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        appointmentType: formData.appointmentType,
        prescription: formData.prescription,
        status: formData.status,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/appointments/add`,
        appointmentData
      );

      navigate("/appointments");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create appointment. Please try again."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading && !patients.length && !doctors.length) {
    return <div className="text-center mt-10">Loading initial data...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Appointment
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.patientId}
            onChange={handleChange}
            name="patientId"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} {/* Display patient.name */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Doctor
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.doctorId}
            onChange={handleChange}
            name="doctorId"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                 {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.appointmentDate}
              onChange={handleChange}
              name="appointmentDate"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.appointmentTime}
              onChange={handleChange}
              name="appointmentTime"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Type
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.appointmentType}
            onChange={handleChange}
            name="appointmentType"
            required
          >
            <option value="in-person">In-person</option>
            <option value="video">Video</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prescription/Notes
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            value={formData.prescription}
            onChange={handleChange}
            name="prescription"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/appointments")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
