import mongoose from "mongoose";
import Appointment from "../model/Appointment.model.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate([
      // Lookup doctor details using doctorId from Appointment collection
      {
        $lookup: {
          from: "doctors", // target collection
          localField: "doctorId", // field in Appointment
          //localField: The field in your current collection (e.g., appointments) that holds the reference (usually an ObjectId).
          // foreignField: The field in the other collection (e.g., doctors) that matches the value of localField.
          foreignField: "_id", // field in Doctor
          as: "doctorDetails",
        },
      },
      // Flatten doctorDetails array to a single object
      { $unwind: "$doctorDetails" },

      // Lookup patient details using patientId
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patientDetails",
        },
      },
      // Flatten patientDetails array
      { $unwind: "$patientDetails" },

      // Select only required fields to return in response
      {
        $project: {
          patientName: 1,
          doctorName: 1,
          appointmentDate: 1,
          appointmentTime: 1,
          status: 1,
          appointmentType: 1,
          prescription: 1,
          createdAt: 1,
          updatedAt: 1,
          doctorDetails: {
            name: 1,
            _id: 1,
          },
          patientDetails: {
            name: 1,
            _id: 1,
          },
        },
      },
    ]);

    // No appointments found
    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // Success
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createAppointment = async (req, res) => {
  const {
    patientName,
    doctorName,
    appointmentDate,
    appointmentTime,
    status = "pending",
    prescription,
    doctorId,
    patientId,
    appointmentType,
  } = req.body;

  // Check for required fields
  if (
    !patientName ||
    !doctorName ||
    !appointmentDate ||
    !appointmentTime ||
    !prescription ||
    !status ||
    !doctorId ||
    !patientId ||
    !appointmentType
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Disallow past appointments
  if (new Date(appointmentDate) < new Date()) {
    return res
      .status(400)
      .json({ message: "Appointment date cannot be in the past" });
  }

  try {
    // Check for existing appointment at same time with same doctor and patient
    const existingAppointment = await Appointment.findOne({
      appointmentDate,
      appointmentTime,
      doctorId,
      patientId,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Appointment already exists for this date and time",
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      patientName,
      doctorName,
      appointmentDate,
      appointmentTime,
      status,
      prescription,
      doctorId,
      patientId,
      appointmentType,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error in creating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const {
      appointmentDate,
      appointmentTime,
      status,
      prescription,
      appointmentType,
      ...rest // Restrict fields like doctorId and patientId from being updated
    } = req.body;

    // Prevent updating restricted fields
    if (Object.keys(rest).length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot update restricted fields" });
    }

    // Check if appointment exists
    const existingAppointment = await Appointment.findById(appointmentId);
    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Disallow updating to past dates
    if (appointmentDate && new Date(appointmentDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Appointment date cannot be in the past" });
    }

    // Check for duplicate/conflicting appointment if date/time is changed
    if (appointmentDate || appointmentTime) {
      const conflictingAppointment = await Appointment.findOne({
        doctorId: existingAppointment.doctorId,
        patientId: existingAppointment.patientId,
        appointmentDate: appointmentDate || existingAppointment.appointmentDate,
        appointmentTime: appointmentTime || existingAppointment.appointmentTime,
        _id: { $ne: appointmentId }, // Exclude the current appointment
      });

      if (conflictingAppointment) {
        return res.status(409).json({
          message: "Another appointment already exists at this time",
        });
      }
    }

    // Update the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        appointmentDate,
        appointmentTime,
        status,
        prescription,
        appointmentType,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      deletedId: appointmentId,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);

    // Handle MongoDB CastError separately
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    res.status(500).json({
      message: "Failed to delete appointment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
