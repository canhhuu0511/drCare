package com.example.doctorappointment.DTO.search;

import com.example.doctorappointment.DTO.clinic.ClinicReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchOutputDTO {
    List<DoctorReadDTO> doctors;
    List<SpecialtyReadDTO> specialties;
    List<ClinicReadDTO> clinics;
}
