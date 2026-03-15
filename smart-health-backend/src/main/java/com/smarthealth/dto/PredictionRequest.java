package com.smarthealth.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionRequest {

    private Long userId;

    private String symptoms;

    private Integer age;

    private String gender;
}