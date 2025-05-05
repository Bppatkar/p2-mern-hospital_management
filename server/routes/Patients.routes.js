import express from "express";
const router = express.Router();
import {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientById,
} from "../controllers/patient.controller.js";

router.route("/").get(getAllPatients);
router.route("/add").post(addPatient);
router.route("/:id").get(getPatientById);
router.route("/update/:id").patch(updatePatient);
router.route("/delete/:id").delete(deletePatient);

export default router;
