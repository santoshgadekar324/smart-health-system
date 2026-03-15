package com.smarthealth.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {

    private Long id;

    private Long patientId;
    private Long doctorId;

    private String patientName;
    private String patientEmail;
    private String patientPhone;

    private String doctorName;
    private String doctorSpecialization;

    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

    private String status;

    private String symptoms;
    private String diagnosis;
    private String prescription;
    private String notes;
    private String consultationType;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}