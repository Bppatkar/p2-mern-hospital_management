import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  samesite: true,
};

connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import patientsRouter from "./routes/Patients.routes.js";
import doctorsRouter from "./routes/Doctors.routes.js";
import appointmentRouter from "./routes/Appointment.routes.js";

// routes
app.use("api/v1", patientsRouter);
app.use("api/v1", doctorsRouter);
app.use("api/v1", appointmentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
