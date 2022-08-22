package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.Booking.BookingDTO;
import com.example.doctorappointment.DTO.Booking.BookingReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.entity.*;
import com.example.doctorappointment.repository.BookingRepo;
import com.example.doctorappointment.repository.ClinicRepo;
import com.example.doctorappointment.repository.ScheduleRepo;
import com.example.doctorappointment.repository.TimeRepo;
import com.example.doctorappointment.service.*;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepo;
    private final DataMapperUtils mapper;

    private ScheduelService scheduelService;
    private final DoctorService doctorService;
    private final PatientService patientService;
    private final EmailSenderService emailSenderService;
    private final ClinicRepo clinicRepo;
    private final TimeRepo timeRepo;

    @Override
    public BookingDTO save(BookingDTO bookingDTO) throws UnsupportedEncodingException, MessagingException {
        BookingEntity bookingEntity = convertDTOToEntity(bookingDTO);
        BookingEntity exits =bookingRepo.findByPatientEmailAndDate(bookingDTO.getPatient().getEmail(), bookingDTO.getDate());
        if ( exits == null) {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            TimeEntity time = timeRepo.findById(bookingDTO.getTimeId());
            String strDate = time.getName() + " " + formatter.format(bookingDTO.getDate());
            DoctorReadDTO doctor = doctorService.getDoctorById(bookingDTO.getDoctorId());
            System.out.println("schedule id "+bookingDTO.getScheduleId());
            String doctorName = doctor.getFirstName() + " " + doctor.getLastName();
            String htmlSend = emailSenderService.getVerifyBooking(bookingDTO.getPatient().getName(), strDate, doctorName, "http://localhost:3000/verify-booking/" + bookingEntity.getToken());
            String subject = "Thông tin đặt lịch khám bệnh";
            emailSenderService.sendEmailHTML(bookingDTO.getPatient().getEmail(), subject, htmlSend);
            return convertEntityToDTO(bookingRepo.save(bookingEntity));
        }else{
            return mapper.map(exits,BookingDTO.class);
        }
    }

    @Override
    public BookingDTO verifyBooking(String token) {
        BookingEntity bookingEntity = bookingRepo.findByToken(token);
        if (bookingEntity != null) {
            bookingEntity.setBookingStatus("CONFIRM");
            bookingRepo.save(bookingEntity);
            return convertEntityToDTO(bookingEntity);
        } else {
            return null;
        }
    }

    @Override
    public List<BookingDTO> findAll() {
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        List<BookingEntity> bookingEntities = bookingRepo.findAll();
        bookingEntities.forEach(bookingEntity -> {
            bookingDTOS.add(convertEntityToDTO(bookingEntity));
        });
        return bookingDTOS;
    }

    @Override
    public String doctorVerifyBooking(int bookingId) {
        BookingEntity bookingEntity = bookingRepo.findById(bookingId);
        if(bookingEntity!=null){
            bookingEntity.setBookingStatus("CHECKED");
            bookingRepo.save(bookingEntity);
            return "update status successfull";
        }else{
            return "not find booking with id";
        }
    }

    @Override
    public List<BookingReadDTO> findAllByDoctorIdAndDate(Date date, int doctorId,String status) {
        List<BookingEntity> bookingEntities = bookingRepo.findAllByDateAndDoctorIdAndBookingStatus(date, doctorId , status);
        List<BookingReadDTO> bookingReadDTOS = new ArrayList<>();
        if (bookingEntities != null) {
            bookingEntities.forEach(bookingEntity -> {
                bookingReadDTOS.add(convertToReadDTO(bookingEntity));
            });
            return bookingReadDTOS;
        } else {
            return null;
        }
    }

    @Override
    public List<BookingReadDTO> findAllByClinicIdAndDate(Date date, int clinicId,String status) {
        List<BookingEntity> bookingEntities = bookingRepo.findAllByDateAndClinicIdAndBookingStatus(date,clinicId,status);
        List<BookingReadDTO> bookingReadDTOS = new ArrayList<>();
        if (bookingEntities != null) {
            bookingEntities.forEach(bookingEntity -> {
                    bookingReadDTOS.add(convertToReadDTO(bookingEntity));
            });
            return bookingReadDTOS;
        } else {
            return null;
        }
    }

    @Override
    public List<BookingReadDTO> findAllDoctorId(int doctorId) {
        List<BookingEntity> bookingEntities = bookingRepo.findAllByDoctorIdOrderByDateAsc( doctorId );
        List<BookingReadDTO> bookingReadDTOS = new ArrayList<>();
        if (bookingEntities != null) {
            bookingEntities.forEach(bookingEntity -> {
                bookingReadDTOS.add(convertToReadDTO(bookingEntity));
            });
            return bookingReadDTOS;
        } else {
            return null;
        }
    }


    private BookingDTO convertEntityToDTO(BookingEntity bookingEntity) {
        BookingDTO bookingDTO = mapper.map(bookingEntity, BookingDTO.class);
        bookingDTO.setDoctorId(bookingEntity.getDoctor().getId());
        return bookingDTO;
    }

    private BookingReadDTO convertToReadDTO(BookingEntity bookingEntity) {
        BookingReadDTO bookingDTO = mapper.map(bookingEntity, BookingReadDTO.class);
        bookingDTO.setTime(timeRepo.findById(bookingEntity.getTimeId()));
        bookingDTO.setDoctorId(bookingEntity.getDoctor().getId());
        return bookingDTO;
    }

    private BookingEntity convertDTOToEntity(BookingDTO bookingDTO) throws UnsupportedEncodingException {
        BookingEntity bookingEntity = mapper.map(bookingDTO, BookingEntity.class);
        DoctorEntity doctor = doctorService.findById(bookingDTO.getDoctorId());
        ClinicEntity clinic = clinicRepo.findDistinctById(bookingDTO.getClinicId());
        bookingEntity.setDoctor(doctor);
        bookingEntity.setClinic(clinic);
        PatientEntity newPatient = patientService.save(bookingDTO.getPatient());
        bookingEntity.setPatient(newPatient);
        bookingEntity.setToken(createToken(bookingDTO));
        return bookingEntity;
    }

    private String createToken(BookingDTO bookingDTO) throws UnsupportedEncodingException {
        String source = bookingDTO.getPatient().getName() + bookingDTO.getId() + bookingDTO.getTimeId();
        byte[] bytes = source.getBytes("UTF-8");
        UUID uuid = UUID.nameUUIDFromBytes(bytes);
        return uuid + "";
    }

}
