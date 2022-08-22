package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.Booking.BookingDTO;
import com.example.doctorappointment.DTO.Booking.BookingReadDTO;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.*;

public interface BookingService {
    BookingDTO save(BookingDTO bookingDTO) throws UnsupportedEncodingException, MessagingException;

    BookingDTO verifyBooking(String token);
    List<BookingDTO> findAll();
    String doctorVerifyBooking(int bookingId);
    List<BookingReadDTO> findAllByDoctorIdAndDate(Date date, int doctorId,String status);
    List<BookingReadDTO> findAllByClinicIdAndDate(Date date, int clinicId,String status);

    List<BookingReadDTO> findAllDoctorId( int doctorId);


}
