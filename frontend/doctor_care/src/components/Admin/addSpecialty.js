import React from "react";
import "../../styles/admin/add_specialty.scss";
import { useState } from "react";
import {manageAdminService} from "../../services/ManageAdminService"
import swal from "sweetalert";

export default function AddSpecialty() {
  let [state, setState] = useState({
    values: {
      name: "",
      image: "",
      description: "",
    },
    errors: {
        name: "",
        image: "",
        description: "",
      },
  });
  const handleChangeInput = (event) => {
    event.preventDefault();
    let { value, name } = event.target;
    let newValues = {
      ...state.values,
      [name]: value,
    };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };
    setState({ values: newValues, errors: newErrors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let { values, errors } = state;

    for (let key in values) {
      if (values[key] === "") {
        // kiểm tra lỗi
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      alert("thông tin không hợp lệ");
      return;
    } else {
        manageAdminService
        .addSpecialty(values)
        .then((res) => {
          swal({
            title: "Thêm tin thành công",
            icon: "success",
            button: "OK",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
            console.log(err.response)
          swal({
            title: err.response.data,
            text: "Điền lại thông tin!",
            icon: "warning",
            button: "OK",
          });
        });
    }
  };
  return (
    <div
      className="modal fade"
      id="addSpecialModal"
      tabIndex={-1}
      aria-labelledby="addNewsModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNewsModalTitle">
              Thêm chuyên khoa
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="user-form">
              <div className="row">
                <div className="col-12">
                  <div className="textb">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Tên chuyên khoa</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                  <div className="textb">
                    <input
                      type="text"
                      name="image"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">hình ảnh</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                  <div className="textb">
                    <textarea
                      type="text"
                      name="description"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Mô tả</div>
                    <span className="text-danger">
                      {/* {this.state.errors.maPhim} */}
                    </span>
                  </div>
                
                </div>
              </div>
              <button className="btn ">
                  <h3>Thêm</h3>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
