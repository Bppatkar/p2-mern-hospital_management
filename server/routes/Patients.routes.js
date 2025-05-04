import express from "express";
const router = express.Router();
import {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

router.route("/").get(getAllPatients);
router.route("/add").post(addPatient);
router.route("/update/:id").patch(updatePatient);
router.route("/delete/:id").delete(deletePatient);

export default router;
