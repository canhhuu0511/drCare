import axios from "axios";
import { domain } from "../constants/setting_api";

export class ManageService {
  getListOfSpecialty() {
    return axios({
      url: `${domain}/specialty/all`,
      method: "GET",
    });
  }
  getListOfClinic() {
    return axios({
      url: `${domain}/clinic/all`,
      method: "GET",
    });
  }
  getClinicById(id) {
    return axios({
      url: `${domain}/clinic/${id}`,
      method: "GET",
    });
  }
  getClinicByAdminId(id) {
    return axios({
      url: `${domain}/clinic/getByAdminId/${id}`,
      method: "GET",
    });
  }
  getSpecialtyById(id) {
    return axios({
      url: `${domain}/specialty/${id}`,
      method: "GET",
    });
  }
  getSpecialtyByClinicId(id) {
    return axios({
      url: `${domain}/clinic/getSpecialties/${id}`,
      method: "GET",
    });
  }

  getDoctors = () => {
    return axios({
      url: `${domain}/doctor/all`,
      method: "GET",
    });
  };
  getDoctor = (doctorId) => {
    return axios.get(`${domain}/doctor/${doctorId}`);
  };
  updateDoctorMarkdown = (doctorId, markdown) => {
    return axios({
      url: `${domain}/doctor/markdown/${doctorId}`,
      method: "PUT",
      data: markdown,
    });
  };
  addDoctorMarkdown = (markdown) => {
    return axios({
      url: `${domain}/doctor/markdown`,
      method: "POST",
      data: markdown,
    });
  };
  getDoctorMarkdown = (doctorId) => {
    return axios({
      url: `${domain}/doctor/markdown/${doctorId}`,
      method: "GET",
    });
  };
  getDoctorScheduleByDate(doctorAndDate) {
    return axios({
        url: `${domain}/doctor/schedule`,
        method: "POST",
        data: doctorAndDate,
      });
  }
  getDoctorByEmail(email){
    return axios({
      url: `${domain}/doctor/email/${email}`,
      method: "GET",
    });
  }
  updateSpecialtyMarkdown = (specialtyId, markdown) => {
    return axios({
      url: `${domain}/specialty/markdown/${specialtyId}`,
      method: "PUT",
      data: markdown,
    });
  };
  addSpecialtyMarkdown = (markdown) => {
    return axios({
      url: `${domain}/specialty/markdown`,
      method: "POST",
      data: markdown,
    });
  };
  getSpecialtyMarkdown = (specialtyId) => {
    return axios({
      url: `${domain}/specialty/markdown/${specialtyId}`,
      method: "GET",
    });
  }
  getNews = () =>{
    return axios({
      url: `${domain}/news/`,
      method: "GET"
    })
  }
  getDetailOfNew = (url) =>{
    return axios({
      url: `${domain}/news/detail?url=${url}`,
      method: "GET",
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  }
 
}
export const manageService = new ManageService();
