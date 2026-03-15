package com.smarthealth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Role is required")
    private String role; // PATIENT, DOCTOR

    private String phone;
    private Integer age;
    private String gender;
    private String address;
    
    // Doctor-specific fields
    private String specialization;
    private String qualification;
    private Integer experienceYears;
    private Double consultationFee;
    private String availableDays;
    private String availableTime;
    private String hospitalAffiliation;
}
