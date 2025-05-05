import mongoose from "mongoose";

const appointment_Schema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending ", "confirmed", "completed", "canceled"],
      default: "pending",
      required: true,
    },
    prescription: {
      type: String,
      required: false,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentType: {
      type: String,
      enum: ["in-person", "virtual"],
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointment_Schema);

export default Appointment;
