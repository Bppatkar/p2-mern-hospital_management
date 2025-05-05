import mongoose from "mongoose";
import Doctor from "../model/doctor.schema.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.aggregate([
      {
        $lookup: {
          from: "appointments", // Name of the appointments collection
          localField: "_id", // Doctor's _id in the doctors collection
          foreignField: "doctorId", // doctorId in the appointments collection
          as: "appointments", // Name of the new array that will hold appointments
        },
      },
      {
        $project: {
          name: 1, // include doctor's name
          email: 1, // Include doctor's email
          specialization: 1, // Include doctor's specialization
          phoneNumber: 1, // Include doctor's phone number
          appointments: 1, // Include appointments
        },
      },
    ]);
    if (!doctors) {
      return res.status(404).json({ message: "No doctors found" });
    }
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const newDoctor = async (req, res) => {
  try {
    const { name, email, specialization, phoneNumber, experience } = req.body;
    if (!name || !email || !specialization || !phoneNumber || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor already exists with this email" });
    }

    // create a new doctor
    const doctor = new Doctor({
      name,
      email,
      specialization,
      phoneNumber,
      experience,
    });
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error("Error in adding doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }
    const { name, email, specialization, phoneNumber, experience } = req.body;
    if (!name || !email || !specialization || !phoneNumber || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the doctor exists
    const existingDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        name,
        email,
        specialization,
        phoneNumber,
        experience,
      },
      { new: true, runValidators: true }
    );
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: existingDoctor,
    });
  } catch (error) {
    console.error("Error in updating doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Doctor deleted successfully",
      deletedId: doctorId,
    });
  } catch (error) {
    console.error("Error in deleting doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
