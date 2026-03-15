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
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String phone;
    private Integer age;
    private String gender;
    private String address;
    private String medicalHistory;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
