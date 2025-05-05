import express from "express";
const router = express.Router();
import {
  getAllDoctors,
  newDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.js";

router.route("/").get(getAllDoctors);
router.route("/add").post(newDoctor);
router.route("/update/:id").patch(updateDoctor);
router.route("/delete/:id").delete(deleteDoctor);

export default router;
