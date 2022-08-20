package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.search.SearchOutputDTO;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.SearchService;
import com.example.doctorappointment.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private SpecialtyService specialtyService;
    @Autowired
    private ClinicService clinicService;
    @Override
    public SearchOutputDTO search() {
        SearchOutputDTO output = new SearchOutputDTO();

        output.setDoctors(doctorService.findTop5());
        output.setSpecialties(specialtyService.findTop5());
        output.setClinics(clinicService.findTop5());

        return output;
    }

    @Override
    public SearchOutputDTO search(String keyword) {
        SearchOutputDTO output = new SearchOutputDTO();

        output.setDoctors(doctorService.findByName(keyword));
        output.setSpecialties(specialtyService.search(keyword));
        output.setClinics(clinicService.search(keyword));
        return output;
    }
}
