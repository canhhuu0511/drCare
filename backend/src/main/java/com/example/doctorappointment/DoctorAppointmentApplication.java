package com.example.doctorappointment;

import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.*;
import com.example.doctorappointment.repository.*;

import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class DoctorAppointmentApplication {
    @Value("${FilePath}")

    public static void main(String[] args) {
        SpringApplication.run(DoctorAppointmentApplication.class, args);
    }


    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    CommandLineRunner run(ClinicMarkdownRepo CMDrepo,UserService userService, SpecialtyRepo repo, ClinicRepo clinicRepo, PositionRepo positionRepo,TimeRepo timeRepo) {

        return args -> {
//            userService.saveRole(new RoleEntity(0, Config.ROLE.DOCTOR.getValue()));
//            userService.saveRole(new RoleEntity(0, Config.ROLE.ADMIN.getValue()));
//            userService.saveRole(new RoleEntity(0, Config.ROLE.PATIENT.getValue()));
//            userService.saveRole(new RoleEntity(0, Config.ROLE.CLINIC.getValue()));
////
//            userService.saveUser(new UserEntity(0, "danh@gmail.com", "1234", true, null));
//            userService.addRoleToUser("danh@gmail.com", Config.ROLE.ADMIN.getValue());
//            List<String> systom1 = new ArrayList<>();
//            systom1.add("Khám chữa bệnh gãy chân");
//            systom1.add("Nhức mỏi xương khớp");
//            systom1.add("đau vai gáy");
//            systom1.add("Thoát vị dĩa đệm");
//            systom1.add("Khám chữa bệnh gãy tay");
//            List<String> systom2 = new ArrayList<>();
//            systom2.add("Chứng đau nữa đầu");
//            systom2.add("có chiệu trứng trầm cảm");
//            systom2.add("mắc chứng tự kỷ");
//            systom2.add("Thân kinh");
//            systom1.add("Khám chữa bệnh gãy tay");
//            List<String> systom3 = new ArrayList<>();
//            systom3.add(" khó thở ");
//            systom3.add(" bau ngực ");
//            systom3.add("buồn nôn̉");
//            systom3.add("Chóng mặt ngất xỉu");
//            List<String> systom4 = new ArrayList<>();
//            systom4.add("ù tai");
//            systom4.add("Đau rát họng");
//            systom4.add("Ngứa họng");
//            systom4.add("Nghẹt mũi , chảy nước mũi ");
//
////            ClinicMarkdownEntity clinicMarkdownEntity = new ClinicMarkdownEntity(0,"","","","",0);
//            ClinicEntity clinic = clinicRepo.save(new ClinicEntity(0, "Bệnh viện Hữu nghị Việt Đức", "34 Đại Cồ Việt, Hai Bà Trưng, Hà Nội", null, "https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg",0,new ArrayList<SpecialtyEntity>()));
//            SpecialtyEntity specialty1 = new SpecialtyEntity(0, "Cơ xương khớp", "co xuong khop", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg", null,null,systom1,null);
//
//            UserDTO user =  userService.saveUser(new UserEntity(0, "adminclinic@gmail.com", "1234", true, null));
//            userService.addRoleToUser("adminclinic@gmail.com", Config.ROLE.CLINIC.getValue());
//
//            clinic.setAdminId(user.getId());
//
//            specialty1.setClinic(clinic);
//            repo.save(specialty1);
//            repo.save(new SpecialtyEntity(0, "Thần kinh", "than kinh", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg", null,null,systom2,clinic));
//            repo.save(new SpecialtyEntity(0, "Tai mũi họng", "tai-mui-hong", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121146-tai-mui-hong.jpg", null,null,systom4,clinic));
//            repo.save(new SpecialtyEntity(0, "Tim mạch", "tim-mach", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120741-tim-mach.jpg", null,null,systom3,clinic));
//
//            clinic.getSpecialties().add(specialty1);
//            ClinicMarkdownEntity markdown = CMDrepo.save(new ClinicMarkdownEntity(0, "", "", "", "",0));
//            markdown.setClinicId(clinic.getId());
//            CMDrepo.save(markdown);
//            clinic.setMarkdown(markdown);
//            clinicRepo.save(clinic);
//            clinicRepo.save(new ClinicEntity(0, "Bệnh viện Chợ Rẫy", "Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội", null, "https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg", 0,null));
//            clinicRepo.save(new ClinicEntity(0, "Phòng khám Bệnh viện Đại học Y Dược 1", "201B Nguyễn Chí Thanh, Phường 12, Quận 5, Hồ Chí Minh", null, "https://cdn.bookingcare.vn/fr/w500/2020/05/29/112414-pk-dhyd1.jpg", 0,null));
//            clinicRepo.save(new ClinicEntity(0, "Bệnh viện K - Cơ sở Phan Chu Trinh", "9A - 9B Phan Chu Trinh, Hoàn Kiếm, Hà Nội", null, "https://cdn.bookingcare.vn/fr/w500/2020/04/13/114446-anh-bia-bvk.jpg", 0,null));
//            positionRepo.save(new PositionEntity(0, "Thạc sĩ"));
//            positionRepo.save(new PositionEntity(0, "Tiến sĩ"));
//            positionRepo.save(new PositionEntity(0, "Giáo sư"));
//            positionRepo.save(new PositionEntity(0, "Phó giáo sư"));
//            timeRepo.save(new TimeEntity(0,"08:00 - 08:30"));
//            timeRepo.save(new TimeEntity(0,"08:30 - 09:00"));
//            timeRepo.save(new TimeEntity(0,"09:00 - 10:30"));
//            timeRepo.save(new TimeEntity(0,"10:30 - 11:00"));
//            timeRepo.save(new TimeEntity(0,"11:00 - 11:30"));
//            timeRepo.save(new TimeEntity(0,"13:30 - 14:00"));
//            timeRepo.save(new TimeEntity(0,"14:00 - 14:30"));
//            timeRepo.save(new TimeEntity(0,"14:30 - 15:00"));
//            timeRepo.save(new TimeEntity(0,"15:00 - 15:30"));
//            timeRepo.save(new TimeEntity(0,"15:30 - 16:00"));


        };
    }
}
