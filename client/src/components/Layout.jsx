import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow contain-container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;