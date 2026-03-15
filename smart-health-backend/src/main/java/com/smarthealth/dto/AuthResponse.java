package com.smarthealth.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private Long id;

    private String name;

    private String email;

    private String role;

    private String token;

    private String message;

    private String type;
}