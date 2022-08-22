package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface BookingRepo extends JpaRepository<BookingEntity, Integer> {
    List<BookingEntity> findAll();
    BookingEntity findByToken(String token);
    BookingEntity findById(int id);
    BookingEntity findByPatientEmailAndDate(String email,Date date);
    List<BookingEntity> findAllByDateAndDoctorIdAndBookingStatus(Date date , int doctorId,String status);
    List<BookingEntity> findAllByDateAndClinicIdAndBookingStatus(Date date , int clinicId,String status);


    List<BookingEntity> findAllByDoctorIdOrderByDateAsc( int doctorId);


}