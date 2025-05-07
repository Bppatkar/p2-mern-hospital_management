import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
dotenv.config();

const allowedOrigins = [
  "https://p1-stock-market-mern.vercel.app",
  /\.vercel\.app$/, // Allows all Vercel preview deployments
  "https://p2-mern-hospital-management.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin matches any allowed pattern
    if (
      allowedOrigins.some((pattern) => {
        return typeof pattern === "string"
          ? origin === pattern
          : pattern.test(origin);
      })
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  samesite: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import patientsRouter from "./routes/Patients.routes.js";
import doctorsRouter from "./routes/Doctors.routes.js";
import appointmentRouter from "./routes/Appointment.routes.js";

// routes
app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/appointments", appointmentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
