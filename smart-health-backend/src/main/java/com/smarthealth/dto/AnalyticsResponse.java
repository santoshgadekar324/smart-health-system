package com.smarthealth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private Long totalUsers;
    private Long totalDoctors;
    private Long totalAppointments;
    private Long totalPredictions;
    
    private Long pendingAppointments;
    private Long confirmedAppointments;
    private Long completedAppointments;
    private Long cancelledAppointments;
    
    private List<DiseaseCount> topDiseases;
    private List<DiseaseCount> diseaseDistribution;
    
    private Map<String, Long> appointmentsByStatus;
    private Map<String, Long> appointmentsByMonth;
    private Map<String, Long> predictionsByDisease;
    
    private Double averageAppointmentsPerDay;
    private Double averagePredictionsPerDay;
}
