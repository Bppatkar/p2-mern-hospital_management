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
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    specialization: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please use a valid 10-digit phone number"],
    },
    experience: {
      type: Number,
      required: true,
      min: [0, "Experience can't be less than 0 years"], // You can define a minimum experience value
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctor_Schema);

export default Doctor;
