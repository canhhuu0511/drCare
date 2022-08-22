import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { LoadingPage } from "./pages/loading";
import "./styles/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogsPage } from "./pages/blogs";
import { Admin } from "./pages/admin/admin";
import { SpecialtyTable } from "./components/Admin/specialty";
import { UsersTable } from "./components/Admin/users";
import { PatientTemplate } from "./pages/patientTemplate";
import { AddInformation } from "./components/Admin/addInformation";
import { ManageSchedule } from "./components/Admin/manageSchedule";
import { BookingPage } from "./pages/doctor_booking";
import { VerifyBooking } from "./pages/verifyBooking";
import { ManageBooking } from "./components/Admin/booking";
import { MarkdownSpecialty } from "./components/Admin/addInfomationSpecialty";
import { DetailSpecialTy } from "./pages/specialtyInfo";
import {Support} from "./pages/support";
import { ManageClinic } from "./components/Admin/clinic";
import { ClinicPage } from "./pages/clinicInfo";


function App() {
  const LoginPage = lazy(() =>
    import("./pages/login").then((module) => ({
      default: module.LoginPage,
    }))
  );
  const HomePage = lazy(() =>
    import("./pages/home").then((module) => ({
      default: module.HomePage,
    }))
  );
  const DoctorPage = lazy(() =>
    import("./pages/doctorInfo").then((module) => ({
      default: module.DoctorPage,
    }))
  );
  const auth = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userLogin"));
  console.log(user);
  return (
      
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              !auth &&!user ? (
                <LoginPage />
              ) : user.role.id === 2 ?(
                <Navigate to={"/admin/specialties"} replace />
              ):(
                <Navigate to={"/admin/booking"} replace />
              )
            }
          />
          <Route path="" element={<PatientTemplate />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.BOOKING} element={<BookingPage />} />
            <Route path={ROUTES.BLOG} element={<BlogsPage />} />
            <Route path={"/verify-booking/:token"} element={<VerifyBooking />} />
            <Route path={ROUTES.DOCTOR_INFO} element={<DoctorPage />} />
            <Route path={ROUTES.CLINIC_INFO} element={<ClinicPage />} />
            <Route path={ROUTES.SPECIALTY_INFO} element={<DetailSpecialTy />} />
            <Route path="support" element={<Support/>} />

          </Route>
          <Route
            path="/admin"
            element={auth && user ? <Admin /> : <Navigate to={ROUTES.LOGIN} replace />}
          >
            <Route path="users" element={<UsersTable />} />\
            {user && (<Route path="specialties" element={ user.role.id==2?<SpecialtyTable />:<Navigate  to={ROUTES.LOGIN} replace/>} />) }
            <Route path="info" element={<AddInformation />} />
            <Route path="specialty-info" element={<MarkdownSpecialty />} />
            <Route path="booking" element={<ManageBooking />} />
            <Route path="clinic" element={<ManageClinic />} />
            <Route path="schedule" element={<ManageSchedule />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
