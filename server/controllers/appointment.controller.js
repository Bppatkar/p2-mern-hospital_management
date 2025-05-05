import mongoose from "mongoose";
import Appointment from "../model/appointment.schema.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId", "name")
      .populate("patientId", "name");
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
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

  // check if date is in the past
  if (new Date(appointmentDate) < new Date()) {
    return res
      .status(400)
      .json({ message: "Appointment date cannot be in the past" });
  }
  try {
    // checking if the appointment already exists
    const existingAppointment = await Appointment.findone({
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

    // creating a new appointment
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
      ...rest // Captures unwanted fields (e.g., doctorId, patientId)
    } = req.body;

    // Prevent updating restricted fields (e.g., doctorId, patientId)
    if (Object.keys(rest).length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot update restricted fields" });
    }

    // Fetch the existing appointment first (needed for duplicate checks)
    const existingAppointment = await Appointment.findById(appointmentId);
    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Validate appointment date (if being updated)
    if (appointmentDate && new Date(appointmentDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Appointment date cannot be in the past" });
    }

    // Check for duplicate appointments (if date/time is updated)
    if (appointmentDate || appointmentTime) {
      const conflictingAppointment = await Appointment.findOne({
        doctorId: existingAppointment.doctorId, // Use the existing appointment's doctorId
        patientId: existingAppointment.patientId, // Use the existing appointment's patientId
        appointmentDate: appointmentDate || existingAppointment.appointmentDate,
        appointmentTime: appointmentTime || existingAppointment.appointmentTime,
        _id: { $ne: appointmentId }, // Exclude current appointment [the $ne operator selects documents where the value of a specified field is not equal to a specified value.]
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
        new: true, // Return the updated document
        runValidators: true, // Ensure schema validations run
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

    // validate appointment ID format (to prevent CastError)
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    // Return minimal success response (consider logging instead of returning full data)
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      deletedId: appointmentId, // Optional: return deleted ID for reference
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);

    // More specific error handling
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    res.status(500).json({
      message: "Failed to delete appointment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
