package com.smarthealth.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symptoms;

    private String predictedDisease;

    private Double confidenceScore;

    private String severity;

    private String recommendations;

    @ManyToOne
    private User user;   // ⭐ IMPORTANT

    private Integer userAge;

    private String userGender;

    private String userName;

    private String userEmail;

    private LocalDateTime createdAt;
}