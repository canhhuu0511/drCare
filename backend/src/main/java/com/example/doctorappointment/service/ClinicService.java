package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.clinic.ClinicDTO;
import com.example.doctorappointment.DTO.clinic.ClinicReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.SpecialtyEntity;

import java.util.List;

public interface ClinicService {

    ClinicEntity save(ClinicEntity clinic);
    ClinicReadDTO getById(int id);
    ClinicReadDTO getByAdminId(int adminId);
    ClinicEntity getEntityById(int id);
    ClinicDTO createClinic(ClinicDTO clinic);
    ClinicDTO updateClinic(int id , ClinicEntity clinic);
    boolean deleteClinic(int id);
    boolean exitsByName(String name);

    List<ClinicReadDTO> search(String systom);
    List<ClinicReadDTO> getAll();
    List<ClinicReadDTO> findTop5();

}
