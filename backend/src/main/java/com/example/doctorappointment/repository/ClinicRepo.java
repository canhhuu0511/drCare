package com.example.doctorappointment.repository;

import com.example.doctorappointment.DTO.clinic.ClinicReadDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClinicRepo extends JpaRepository<ClinicEntity, Integer> {
    List<ClinicEntity> findDistinctByNameLike(@Param("systom") String systom);
    boolean existsByName(String name);

    ClinicEntity getClinicByAdminId(int adminId);

    ClinicEntity findDistinctById(int id);
}
