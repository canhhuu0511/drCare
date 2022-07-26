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
import { Paper } from "@material-ui/core";
import "../../styles/admin/specialty.scss"
import AddDoctor from "./addDoctors";


export const UsersTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    manageService
        .getDoctors()
        .then((result) =>{
          console.log(result);
          setDoctors(result.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
    return () => {
    };
  }, []);

  


  const renderTable = () => {
    return doctors && doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((doctor) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={doctor.id}>
          <TableCell>{doctor.id}</TableCell>
          <TableCell>
            <div className="news__description">{doctor.firstName}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.lastName}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.phone}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.user.email}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.gender?"Nam":"Nữ"}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.clinic.name}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.specialty.name	}</div>
          </TableCell>
          <TableCell>
            <img
              src={doctor.image}
              style={{ width: "70px", height: "50px" }}
              alt={doctor.image}
            />
          </TableCell>
          <TableCell>
            <div style={{ display: "flex",fontSize:"2em"}}>
              <div className="edit-action mr-2 ">
                <i
                  style={{
                    cursor: "pointer",
                    color: "#60c5ef",
                  }}
                  className="fa fa-edit"
                  data-toggle="modal"
                  data-target={`#d${doctor.id}`}
                ></i>
                {/* <Editdoctors doctors ={doctor}/> */}
              </div>
              <div className="delete-action">
                <i
                  style={{ cursor: "pointer", color: "#fb4226",fontSize:"1em" }}
                  className="fa fa-trash"
                  onClick={() => {
                    swal({
                      title: "Bạn chắc chứ?",
                      text: `Xoá tin này`,
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        // deleteDoctors(doctor.id);
                      }
                    });
                  }}
                ></i>
              </div>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  }
   
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper
      className="specialty-admin"
      style={{ width: "100%", marginTop: "4.5em" }}
    >
      <div className="header">
        <h2>Quản lý bác sĩ</h2>
      </div>
      <button
        className="btnAdd mb-3"
        data-toggle="modal"
        data-target="#addDoctorModal"
      >
        <i className="fa fa-plus"></i>
        <h2>Thêm mới</h2>
      </button>
      <AddDoctor/>
      <TableContainer style={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Họ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Phòng khám</TableCell>
              <TableCell>Chuyên khoa</TableCell>
              <TableCell>Ảnh đại diện</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTable()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 10, 25]}
        component="div"
        count={doctors&&doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
