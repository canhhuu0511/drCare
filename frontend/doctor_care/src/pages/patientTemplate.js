import React from "react";

import "../styles/admin.scss";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const PatientTemplate = () => {
  return (
    <div style={{position:'relative',minHeight:"100vh"}}>
      <Navbar />
      <Outlet />
    </div>
  );
};
