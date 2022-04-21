package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.entity.RoleEntity;

import java.util.List;

public interface
UserService {
    boolean exists(String email);
    UserDTO saveUser(UserEntity user);
    RoleEntity saveRole(RoleEntity role);
    void addRoleToUser(String username, String roleName);
    UserEntity getUser(String email);
    String getEmail();
}
