import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home.jsx"));
const PatientsPage = lazy(() => import("./pages/PatientsPage.jsx"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage.jsx"));
const AppointmentsPage = lazy(() => import("./pages/AppointmentPage.jsx"));
const UpdatePatient = lazy(() => import("./components/Patients/UpdatePatient.jsx"));
const AddPatient = lazy(() => import("./components/Patients/AddPatient.jsx"));
const AddDoctor = lazy(() => import("./components/Doctor/AddDoctor.jsx"));
const UpdateDoctor = lazy(() => import("./components/Doctor/UpdateDoctor.jsx"));
const AddAppointment = lazy(() => import("./components/Appointment/AddAppointment.jsx"));
const UpdateAppointment = lazy(() => import("./components/Appointment/UpdateAppointment.jsx"));

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><Home /></Suspense>} />
          
          {/* Patient Routes */}
          <Route path="patients" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><PatientsPage /></Suspense>} />
          <Route path="patients/add" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><AddPatient /></Suspense>} />
          <Route path="patients/update/:id" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><UpdatePatient /></Suspense>} />

          {/* Doctor Routes */}
          <Route path="doctors" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><DoctorsPage /></Suspense>} />
          <Route path="doctors/add" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><AddDoctor /></Suspense>} />
          <Route path="doctors/update/:id" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><UpdateDoctor /></Suspense>} />

          {/* Appointment Routes */}
          <Route path="appointments" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><AppointmentsPage /></Suspense>} />
          <Route path="appointments/add" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><AddAppointment /></Suspense>} />
          <Route path="appointments/update/:id" element={<Suspense fallback={<div className="text-center text-3xl">Loading...</div>}><UpdateAppointment /></Suspense>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

