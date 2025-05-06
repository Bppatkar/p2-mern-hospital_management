import { Link, NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-yellow-300">
          Clinic Dashboard 🏥
        </Link>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Patients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Appointments
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
