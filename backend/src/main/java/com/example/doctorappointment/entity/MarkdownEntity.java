package com.example.doctorappointment.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "markdown")
public class MarkdownEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    @Column
    private String contentHTML;

    @Lob
    @Column
    private String contentMarkdown;

    @Lob
    @Column
    private String description;

    @Column
    private int doctorId;

    @Column
    private int specialtyId;

    @Column
    private int clinicId;

}
