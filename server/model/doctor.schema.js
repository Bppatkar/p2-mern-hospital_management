import mongoose from "mongoose";

const doctor_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctor_Schema);

export default Doctor;
