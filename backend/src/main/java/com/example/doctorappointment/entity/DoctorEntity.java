package com.example.doctorappointment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doctors")
public class DoctorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @NotBlank(message = "image không được bỏ trống")
    private String image;

    @Column(nullable = false)
    @NotBlank(message = "Họ tên không được bỏ trống")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Họ tên không được bỏ trống")
    private String lastName;

    @Column(nullable = false)
    @Size( min = 10, max=10,message = "Số điện thoại phải 10 chữ số")
    private String phone;

    @Column(nullable = false)
    private boolean gender;

    @JsonIgnore
    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE)
    @JoinColumn(name = "clinic_id", nullable = false)
    private ClinicEntity clinic;

    @JsonIgnore
    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JoinColumn(name = "specialty_id", nullable = false)
    private SpecialtyEntity specialty;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = EAGER)
    private PositionEntity position;

    @OneToOne(fetch = LAZY)
    private MarkdownEntity markdown;

}
