package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorWriteDTO;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.example.doctorappointment.utility.CustomException;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/doctor")
public class DoctorController {

    private final UserService userService;
    private final DoctorService doctorService;
    private final ClinicService clinicService;

    @GetMapping("/get")
    public ResponseEntity<List<DoctorReadDTO>> checkUserExist() {
        return ResponseEntity.ok().body(doctorService.findAll());
    }

    @PostMapping("/register")
    public ResponseEntity<DoctorReadDTO> saveDoctor(@RequestBody DoctorWriteDTO doctor) throws CustomException {
        UserEntity newUser = doctor.getUser();
        if (userService.exists(newUser.getEmail())) {
            throw new CustomException("Email đã tồn tại trên hệ thống", HttpStatus.BAD_REQUEST);
        }
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(null).toUriString());
        userService.saveUser(newUser);
        userService.addRoleToUser(newUser.getEmail(), Config.ROLE.DOCTOR.getValue());

        UserEntity user = userService.getUser(newUser.getEmail());
        doctor.setUser(user);
        return ResponseEntity.created(uri).body(doctorService.save(doctor));
    }


}


