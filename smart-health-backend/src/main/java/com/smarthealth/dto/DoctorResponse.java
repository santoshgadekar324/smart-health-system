package com.smarthealth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorResponse {

    private Long id;
    private String name;
    private String email;
    private String specialization;
    private String qualification;
    private Integer experienceYears;
    private String phone;
    private Double consultationFee;
    private String availableDays;
    private String availableTime;
    private String hospitalAffiliation;
    private Double rating;
    private Integer totalPatients;
    private Boolean isAvailable;
    private LocalDateTime createdAt;
}
