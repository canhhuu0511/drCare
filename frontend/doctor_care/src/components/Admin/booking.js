import React, { useEffect, useState } from "react";
import { manageService } from "../../services/ManageService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import swal from "sweetalert";
import { Card, Paper } from "@material-ui/core";
import "../../styles/admin/booking_history.scss";
import { bookingService } from "../../services/BookingService";
import moment from "moment";
import { VerifyBookingModal } from "./verifyBookingModal";
import DatePicker from "react-datepicker";
export const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState(null);
  const [clinicSelected, setClinicSelected] = useState(null);
  const [data, setData] = useState([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [allDays, setAllDays] = useState([]);
  const currenUser = JSON.parse(localStorage.getItem("userLogin"));
  const [schedule, setSchedule] = useState({
    doctorId: "",
    date: dateSelected.setHours(0, 0, 0, 0),
    timeId: "",
    name: "",
  });
  const tabs = [
    {
      type: "NEW",
      name: "Chờ duyệt",
    },
    {
      type: "CONFIRM",
      name: "Đã duyệt",
    },
    {
      type: "CHECKED",
      name: "Đã khám",
    },
    {
      type: "FAILED",
      name: "Từ chối",
    },
  ];
  const [type, setType] = useState("NEW");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  useEffect(() => {
    const setDoctor = async () => {
      await manageService.getDoctorByEmail(currenUser.email).then((result) => {
        setDoctorSelected(result.data);
        let request = {
          doctorId: result.data.id,
          date: new Date().setHours(0, 0, 0, 0),
        };
        bookingService
          .getForDoctor(request, type)
          .then((result) => {
            setBookings(result.data);
          })
          .catch((err) => alert("booking for doctor is null"));
        bookingService.getForDoctorDateAsc(result.data.id).then((e) => {
          const obj = e.data.reduce((group, item) => {
            const { date } = item;
            group[date] = group[date] ?? [];
            group[date].push(item);
            return group;
          }, {});
          const arr = Object.keys(obj).map((key) => [Number(key), obj[key]]);
          setData(arr);
        });
      });
    };
    const setClinic = async () => {
      await manageService.getClinicByAdminId(currenUser.id).then((result) => {
        setClinicSelected(result.data);
        let request = {
          clinicId: result.data.id,
          date: new Date().setHours(0, 0, 0, 0),
        };
        bookingService
          .getForClinic(request, type)
          .then((result) => {
            setBookings(result.data);
          })
          .catch((err) => alert("booking for clinic is null"));
      });
    };
    if (currenUser.role.name == "DOCTOR") setDoctor();
    else setClinic();
  }, [type]);

  // let lable = moment(new Date()).add(i, "days").format("dddd - DD/MM");
  // object.lable = lable.charAt(0).toUpperCase() + lable.slice(1);
  // object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
  const formatDate = (date) => {
    let lable = moment(new Date(date)).format("dddd - DD/MM");
    return lable.charAt(0).toUpperCase() + lable.slice(1);
  };
  const splitTime = (time) => time.split("-", 1);
  const splitAddress = (address) => address.split(",", 1);

  console.log(data);
  return data && data.length > 0 ? (
    <Paper
      className="booking"
      style={{ width: "100%", marginTop: "4.5em", padding: "20px" }}
    >
      <div className="text-center">
        <h2>Quản lý lịch khám bệnh</h2>
      </div>
      {data.map((arr, key) => (
        <div className="card" key={key}>
          <div className="card-header">{formatDate(arr[0])}</div>
          <div className="card-body">
            {arr[1].length > 0 &&
              arr[1].map((e, key) => (
                <blockquote key={key} className="block-quote">
                  <div className="card-view">
                    <div className="box1">
                      {splitTime(e.time.name)}-{e.patient.name}
                    </div>
                    <div className="box2">
                      {splitAddress(e.patient.address)}
                    </div>

                    <div className="title">
                      {e.patient.phone} - {doctorSelected.position} -{" "}
                      {doctorSelected.lastName} -{" "}
                      {doctorSelected.specialty.name}
                    </div>
                    <div className="reason">
                      <div className="reason">{e.patient.reason}</div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <select className="select">
                      {tabs.map((table, key) => (
                        <option key={key} value={table.type}>
                          {" "}
                          {table.name}
                        </option>
                      ))}
                    </select>
                    <DatePicker className="select-day" selected={arr[0]} />
                  </div>
                </blockquote>
              ))}
          </div>
        </div>
      ))}
    </Paper>
  ) : (
    <></>
  );
};
