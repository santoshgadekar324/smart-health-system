package com.smarthealth.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResponse {

    private Long id;

    private String symptoms;

    private String predictedDisease;

    private Double confidenceScore;

    private String severity;

    private String recommendations;

    private String userName;

    private String userEmail;

    private LocalDateTime createdAt;
}