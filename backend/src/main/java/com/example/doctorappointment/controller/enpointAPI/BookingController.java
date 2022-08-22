package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.Booking.BookingDTO;
import com.example.doctorappointment.DTO.Booking.BookingReadDTO;
import com.example.doctorappointment.DTO.Booking.VerifyBookingDTO;
import com.example.doctorappointment.DTO.clinic.ClinicScheduleDTO;
import com.example.doctorappointment.DTO.doctor.DoctorScheduleDTO;
import com.example.doctorappointment.repository.TimeRepo;
import com.example.doctorappointment.service.BookingService;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/booking")
public class BookingController {

    private final BookingService bookingService;
    private final EmailSenderService emailSenderService;
    private final DoctorService doctorService;
    private final TimeRepo timeRepo;
    @PostMapping("/create")
    public ResponseEntity<BookingDTO> saveAllSchedule(@RequestBody BookingDTO bookingDTO) throws UnsupportedEncodingException, MessagingException {
        return  ResponseEntity.ok().body(bookingService.save(bookingDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookingDTO>> findAll() {
        return ResponseEntity.ok().body(bookingService.findAll());
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<BookingReadDTO>> findAllDoctorDate(@PathVariable int id) {
        return ResponseEntity.ok().body(bookingService.findAllDoctorId(id));
    }

    @PutMapping("/verify/{token}")
    public ResponseEntity<String> verifyBooking(@PathVariable String token){
        if(bookingService.verifyBooking(token)!=null){
            return ResponseEntity.ok().body("Confirm successful");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not fond with token "+token);
        }
    }
    @PostMapping("/clinic/{status}")
    public ResponseEntity<List<BookingReadDTO>> getAllByClinicIdAndDate(@RequestBody ClinicScheduleDTO clinicScheduleDTO,@PathVariable String status){
        return ResponseEntity.ok().body(bookingService.findAllByClinicIdAndDate(clinicScheduleDTO.getDate(),clinicScheduleDTO.getClinicId(),status));
    }
    @PostMapping("/doctor/{status}")
    public ResponseEntity<List<BookingReadDTO>> getAllByDoctorIdAndDate(@RequestBody DoctorScheduleDTO doctorScheduleDTO,@PathVariable String status ){
        return ResponseEntity.ok().body(bookingService.findAllByDoctorIdAndDate(doctorScheduleDTO.getDate(),doctorScheduleDTO.getDoctorId(),status));
    }

    @PostMapping("/doctor/verify")
    public ResponseEntity<String> doctorVerify(@RequestBody VerifyBookingDTO verifyBookingDTO) throws MessagingException, IOException {
        emailSenderService.sendEmailHTMLWithAttachment(verifyBookingDTO.getEmail(),
                "tets send mail with attachment",
                emailSenderService.getVerifyBooking("canh","11h30","Tuấn",""),
                verifyBookingDTO.getFileName(),
                  verifyBookingDTO.getImageContent()
                );
        return ResponseEntity.ok().body(bookingService.doctorVerifyBooking(verifyBookingDTO.getBookingId()));
    }
}
