package com.smarthealth.services;

import com.smarthealth.dto.AnalyticsResponse;
import com.smarthealth.dto.DiseaseCount;
import com.smarthealth.repositories.AppointmentRepository;
import com.smarthealth.repositories.DoctorRepository;
import com.smarthealth.repositories.PredictionRepository;
import com.smarthealth.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final PredictionRepository predictionRepository;

    public AnalyticsResponse getAnalytics() {
        // Get counts
        Long totalUsers = userRepository.count();
        Long totalDoctors = doctorRepository.count();
        Long totalAppointments = appointmentRepository.count();
        Long totalPredictions = predictionRepository.count();

        // Get appointment counts by status
        Long pendingAppointments = appointmentRepository.countByStatus("PENDING");
        Long confirmedAppointments = appointmentRepository.countByStatus("CONFIRMED");
        Long completedAppointments = appointmentRepository.countByStatus("COMPLETED");
        Long cancelledAppointments = appointmentRepository.countByStatus("CANCELLED");

        // Get disease distribution
        List<DiseaseCount> diseaseDistribution = getDiseaseDistribution();
        List<DiseaseCount> topDiseases = diseaseDistribution.stream()
                .limit(5)
                .collect(java.util.stream.Collectors.toList());

        // Prepare appointment status map
        Map<String, Long> appointmentsByStatus = new HashMap<>();
        appointmentsByStatus.put("PENDING", pendingAppointments);
        appointmentsByStatus.put("CONFIRMED", confirmedAppointments);
        appointmentsByStatus.put("COMPLETED", completedAppointments);
        appointmentsByStatus.put("CANCELLED", cancelledAppointments);

        return AnalyticsResponse.builder()
                .totalUsers(totalUsers)
                .totalDoctors(totalDoctors)
                .totalAppointments(totalAppointments)
                .totalPredictions(totalPredictions)
                .pendingAppointments(pendingAppointments)
                .confirmedAppointments(confirmedAppointments)
                .completedAppointments(completedAppointments)
                .cancelledAppointments(cancelledAppointments)
                .topDiseases(topDiseases)
                .diseaseDistribution(diseaseDistribution)
                .appointmentsByStatus(appointmentsByStatus)
                .averageAppointmentsPerDay(totalAppointments / 30.0)
                .averagePredictionsPerDay(totalPredictions / 30.0)
                .build();
    }

    private List<DiseaseCount> getDiseaseDistribution() {
        List<Object[]> results = predictionRepository.findDiseaseDistribution();
        List<DiseaseCount> diseaseCounts = new ArrayList<>();
        
        Long total = predictionRepository.count();
        
        for (Object[] result : results) {
            String disease = (String) result[0];
            Long count = (Long) result[1];
            Double percentage = total > 0 ? (count * 100.0) / total : 0.0;
            
            diseaseCounts.add(DiseaseCount.builder()
                    .disease(disease)
                    .count(count)
                    .percentage(percentage)
                    .build());
        }
        
        return diseaseCounts;
    }
}
