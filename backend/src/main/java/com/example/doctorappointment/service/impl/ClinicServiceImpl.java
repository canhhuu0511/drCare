package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.clinic.ClinicDTO;
import com.example.doctorappointment.DTO.clinic.ClinicReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.ClinicMarkdownEntity;
import com.example.doctorappointment.entity.MarkdownEntity;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.repository.ClinicMarkdownRepo;
import com.example.doctorappointment.repository.ClinicRepo;
import com.example.doctorappointment.repository.SpecialtyRepo;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.SpecialtyService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClinicServiceImpl implements ClinicService {

    private final ClinicRepo clinicRepo;
    private final DataMapperUtils dataMapperUtils;
    private final ClinicMarkdownRepo markdownRepo;

    @Override
    public ClinicEntity save(ClinicEntity clinic) {
        return clinicRepo.save(clinic);
    }

    @Override
    public ClinicReadDTO getById(int id) {
        ClinicEntity clinic = clinicRepo.findDistinctById(id);
        return convertEntityToDTO(clinic);
    }

    @Override
    public ClinicReadDTO getByAdminId(int adminId) {
        ClinicEntity clinic = clinicRepo.getClinicByAdminId(adminId);
        return convertEntityToDTO(clinic);
    }

    @Override
    public ClinicEntity getEntityById(int id) {
        return null;
    }

    @Override
    public ClinicDTO createClinic(ClinicDTO clinicDTO) {
        ClinicEntity clinic = dataMapperUtils.map(clinicDTO,ClinicEntity.class);
        ClinicMarkdownEntity markdown = markdownRepo.save(new ClinicMarkdownEntity(0,"","","","",clinic.getId()));
        clinic.setMarkdown(markdown);
        clinic.setSpecialties(new ArrayList<SpecialtyEntity>());
        ClinicEntity clinicEntity = clinicRepo.save(clinic);
        markdown.setClinicId(clinicEntity.getId());
        markdownRepo.save(markdown);
        return dataMapperUtils.map(clinicEntity, ClinicDTO.class);
    }

    @Override
    public ClinicDTO updateClinic(int id, ClinicEntity clinic) {
        ClinicEntity clinicUpdate = clinicRepo.findDistinctById(id);
        if (clinicUpdate != null) {
            clinicUpdate.setName(clinic.getName());
            clinicUpdate.setAddress(clinic.getAddress());
            clinicUpdate.setImage(clinic.getImage());
            return dataMapperUtils.map(clinicRepo.save(clinicUpdate), ClinicDTO.class);
        }
        return null;
    }

    @Override
    public boolean deleteClinic(int id) {
        ClinicEntity clinic = clinicRepo.findDistinctById(id);
        if(clinic!=null){
            clinicRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean exitsByName(String name) {
        return clinicRepo.existsByName(name);
    }

    @Override
    public List<ClinicReadDTO> search(String systom) {
        if (systom!=null&&systom!="'\'") {
            try {
                List<ClinicReadDTO> result = clinicRepo.findDistinctByNameLike(systom).stream()
                        .map(clinic -> convertEntityToDTO(clinic))
                        .collect(Collectors.toList());
                return result;
            }catch (Exception e){
                System.out.println("systom : "+systom);
                System.out.println(e);
            }
        }
        return null;
    }

    @Override
    public List<ClinicReadDTO> getAll() {
        List<ClinicEntity> data = clinicRepo.findAll();
        List<ClinicReadDTO> dataResult = data.stream()
                .map(clinic -> convertEntityToDTO(clinic))
                .collect(Collectors.toList());
        return dataResult;
    }

    @Override
    public List<ClinicReadDTO> findTop5() {
        List<ClinicEntity> data = clinicRepo.findTop5ByOrderByNameAscIdDesc();
        List<ClinicReadDTO> dataResult = data.stream()
                .map(clinic -> convertEntityToDTO(clinic))
                .collect(Collectors.toList());
        return dataResult;
    }




    private ClinicReadDTO convertEntityToDTO(ClinicEntity clinic) {
        ClinicReadDTO clinicReadDTO = dataMapperUtils.map(clinic, ClinicReadDTO.class);
//        List<SpecialtyReadDTO> listSpecialty = clinic.getSpecialties().stream()
//                .map(specialty -> convertSpecialtyEntityToDTO(specialty))
//                .collect(Collectors.toList());
//        clinicReadDTO.setSpecialties(listSpecialty);
        clinicReadDTO.setMarkdown(clinic.getMarkdown());
        return clinicReadDTO;
    }
    private SpecialtyReadDTO convertSpecialtyEntityToDTO(SpecialtyEntity specialty) {
        SpecialtyReadDTO specialtyReadDTO = dataMapperUtils.map(specialty, SpecialtyReadDTO.class);
        List<DoctorDTO> listDoctor = specialty.getDoctors().stream()
                .map(doctorEntity -> dataMapperUtils.map(doctorEntity, DoctorDTO.class))
                .collect(Collectors.toList());
        specialtyReadDTO.setDoctors(listDoctor);
        return specialtyReadDTO;
    }
}
