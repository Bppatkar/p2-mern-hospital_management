import { router } from "express";
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/Appointment.controller.js";

router.route("/").get(getAllAppointments);
router.router("/add").post(createAppointment);
router.route("/update/:id").patch(updateAppointment);
router.route("/delete/:id").delete(deleteAppointment);

export default router;
