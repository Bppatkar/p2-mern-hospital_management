import express from "express";
const router = express.Router();
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
} from "../controllers/appointment.controller.js";

router.route("/").get(getAllAppointments);
router.route("/add").post(createAppointment);
router.route("/:id").get(getAppointment);
router.route("/update/:id").patch(updateAppointment);
router.route("/delete/:id").delete(deleteAppointment);

export default router;
