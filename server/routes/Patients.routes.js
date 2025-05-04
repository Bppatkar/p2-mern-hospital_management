import { router } from "express";
import {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

router.route("/").get(getAllPatients);
router.router("/add").post(addPatient);
router.route("/update/:id").patch(updatePatient);
router.route("/delete/:id").delete(deletePatient);

export default router;
