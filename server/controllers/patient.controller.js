import mongoose from "mongoose";
import Patients from "../model/Patient.model.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patients.aggregate([
      {
        $lookup: {
          from: "appointments", // Name of the appointments collection
          localField: "_id", // Local field in Patients collection (patient _id)
          foreignField: "patientId", // Foreign field in Appointments collection (patientId)
          as: "appointments", // Output array containing the appointments
        },
      },
      {
        $project: {
          // Optionally, you can choose to show or exclude fields
          name: 1, // Only include patient's name
          email: 1, // Include email
          phoneNumber: 1, // Include phone number
          appointments: 1, // Include appointments (already linked)
        },
      },
    ]);
    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Explicitly create an ObjectId instance
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(patientId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid patient ID format" });
    }

    const patient = await Patients.findById(objectId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addPatient = async (req, res) => {
  try {
    const { name, email, phoneNumber, dateOfBirth, address } = req.body;
    if (!name || !email || !phoneNumber || !dateOfBirth || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingPatient = await Patients.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }
    const newpatient = new Patients({
      name,
      email,
      phoneNumber,
      dateOfBirth,
      address,
    });
    await newpatient.save();
    res.status(201).json({
      message: "Patient added successfully",
      patient: newpatient,
    });
  } catch (error) {
    console.error("Error in adding patients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const { name, email, phoneNumber, dateOfBirth, address } = req.body;
    if (!name || !email || !phoneNumber || !dateOfBirth || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingEmailPatient = await Patients.findOne({ email });
    if (
      existingEmailPatient &&
      existingEmailPatient._id.toString() !== patientId
    ) {
      return res
        .status(400)
        .json({ message: "Email already in use by another patient" });
    }

    const existingPatient = await Patients.findByIdAndUpdate(
      patientId,
      {
        name,
        email,
        phoneNumber,
        dateOfBirth,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!existingPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found or update failed" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient: existingPatient,
    });
  } catch (error) {
    console.error("Error in updating patients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const deletedPatient = await Patients.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({
      message: "Patient deleted successfully",
      deletedId: patientId,
    });
  } catch (error) {
    console.error("Error in deleting patients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
