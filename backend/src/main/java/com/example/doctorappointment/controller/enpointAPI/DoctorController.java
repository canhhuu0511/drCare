package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.Message;
import com.example.doctorappointment.DTO.ScheduleDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorScheduleDTO;
import com.example.doctorappointment.DTO.doctor.DoctorWriteDTO;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.MarkdownEntity;
import com.example.doctorappointment.entity.PositionEntity;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.repository.MarkdownRepo;
import com.example.doctorappointment.repository.PositionRepo;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.ScheduelService;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.example.doctorappointment.utility.CustomException;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/doctor")
public class DoctorController {

    private final UserService userService;
    private final DoctorService doctorService;
    private final PositionRepo positionRepo;
    private final MarkdownRepo markdownRepo;
    private final ScheduelService scheduelService;


    @GetMapping("/all")
    public ResponseEntity<List<DoctorReadDTO>> checkUserExist() {
        return ResponseEntity.ok().body(doctorService.findAll());
    }
    @GetMapping("/{doctorId}")
    public ResponseEntity<DoctorReadDTO> getBYId(@PathVariable int doctorId){
        return ResponseEntity.ok().body(doctorService.getDoctorById(doctorId));
    }
    
    @DeleteMapping("/{doctorId}")
    public ResponseEntity<Boolean> deleteDoctor(@PathVariable int doctorId){
        return ResponseEntity.ok().body(doctorService.delete(doctorId));
    }

    @PutMapping("/{doctorId}")
    public ResponseEntity<DoctorReadDTO> update(@PathVariable int doctorId,@RequestBody DoctorWriteDTO doctor) throws CustomException {
        UserEntity newUser = doctor.getUser();
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(null).toUriString());
        if (!userService.exists(newUser.getEmail())) {
            userService.saveUser(newUser);
            userService.addRoleToUser(newUser.getEmail(), Config.ROLE.DOCTOR.getValue());
            UserEntity user = userService.getUser(newUser.getEmail());
            doctor.setUser(user);
        }
        return ResponseEntity.created(uri).body(doctorService.update(doctorId,doctor));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<DoctorReadDTO> getByEmail(@PathVariable String email){
        return ResponseEntity.ok().body(doctorService.getDoctorByEmail(email));
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

    @GetMapping("/positon")
    public ResponseEntity<List<PositionEntity>> getPosition(){
        return ResponseEntity.ok().body(positionRepo.findAll());
    }


    @GetMapping("/markdown/{doctorId}")
    public ResponseEntity<MarkdownEntity> getMarkdownWithDoctorId(@PathVariable int doctorId){
        System.out.println(doctorId);
        return  ResponseEntity.ok().body(markdownRepo.findByDoctorId(doctorId));
    }

    @PostMapping("/markdown")
    public ResponseEntity<Message> addMarkdown(@RequestBody MarkdownEntity newMarkdown){
        if(newMarkdown.getDoctorId()!=0&&markdownRepo.findByDoctorId(newMarkdown.getDoctorId())==null){
            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(),"ok","create successful",markdownRepo.save(newMarkdown)));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message(new Date(),"Exist","Exist markdown with doctorId "+newMarkdown.getDoctorId(),""));
    }
    @PutMapping("/markdown/{doctorId}")
    public ResponseEntity<Message> updateMarkdown(@RequestBody MarkdownEntity newMarkdown,@PathVariable int doctorId){
        MarkdownEntity updateMarkdown = markdownRepo.findByDoctorId(doctorId);
        if(updateMarkdown!=null){
            updateMarkdown.setContentMarkdown(newMarkdown.getContentMarkdown());
            updateMarkdown.setContentHTML(newMarkdown.getContentHTML());
            updateMarkdown.setDescription(newMarkdown.getDescription());

            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(),"ok","update successful",markdownRepo.save(updateMarkdown)));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Message(new Date(),"not found","can not find markdown with doctorId "+doctorId,""));
    }

    @PostMapping("/schedule")
    public ResponseEntity<List<ScheduleDTO>> getScheduleByDate(@RequestBody DoctorScheduleDTO doctorScheduleDTO){
        System.out.println(doctorScheduleDTO.getDoctorId()+" "+doctorScheduleDTO.getDate());
        return ResponseEntity.ok().body(scheduelService.getScheduleByDate(doctorScheduleDTO.getDoctorId(),doctorScheduleDTO.getDate()));
    }

 
}


