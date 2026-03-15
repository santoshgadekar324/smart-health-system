package com.smarthealth.services;

import com.smarthealth.dto.PredictionRequest;
import com.smarthealth.dto.PredictionResponse;
import com.smarthealth.models.Prediction;
import com.smarthealth.models.User;
import com.smarthealth.repositories.PredictionRepository;
import com.smarthealth.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final PredictionRepository predictionRepository;
    private final UserRepository userRepository;

    @Transactional
    public PredictionResponse predictDisease(PredictionRequest request) {
        User user = null;
        
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId()).orElse(null);
        }

        // Simple disease prediction logic (replace with actual ML model)
        String predictedDisease = predictDiseaseFromSymptoms(request.getSymptoms());
        Double confidenceScore = calculateConfidence(request.getSymptoms());
        String severity = determineSeverity(predictedDisease);
        String recommendations = getRecommendations(predictedDisease);

        // Create prediction record
        Prediction prediction = Prediction.builder()
                .user(user)
                .symptoms(request.getSymptoms())
                .predictedDisease(predictedDisease)
                .confidenceScore(confidenceScore)
                .severity(severity)
                .recommendations(recommendations)
                .userName(user != null ? user.getName() : "Guest")
                .userEmail(user != null ? user.getEmail() : null)
                .userAge(request.getAge() != null ? request.getAge() : (user != null ? user.getAge() : null))
                .userGender(request.getGender() != null ? request.getGender() : (user != null ? user.getGender() : null))
                .build();

        Prediction saved = predictionRepository.save(prediction);

        return convertToResponse(saved);
    }

    public List<PredictionResponse> getAllPredictions() {
        return predictionRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public PredictionResponse getPredictionById(Long id) {
        Prediction prediction = predictionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prediction not found"));
        return convertToResponse(prediction);
    }

    public List<PredictionResponse> getPredictionsByUser(Long userId) {
        return predictionRepository.findByUserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private String predictDiseaseFromSymptoms(String symptoms) {
        String symptomsLower = symptoms.toLowerCase();
        
        if (symptomsLower.contains("fever") && symptomsLower.contains("cough")) {
            return "Flu";
        } else if (symptomsLower.contains("headache") && symptomsLower.contains("nausea")) {
            return "Migraine";
        } else if (symptomsLower.contains("chest pain") || symptomsLower.contains("shortness of breath")) {
            return "Heart Disease";
        } else if (symptomsLower.contains("joint pain") || symptomsLower.contains("swelling")) {
            return "Arthritis";
        } else if (symptomsLower.contains("fatigue") && symptomsLower.contains("weight loss")) {
            return "Diabetes";
        } else if (symptomsLower.contains("rash") || symptomsLower.contains("itching")) {
            return "Skin Allergy";
        } else if (symptomsLower.contains("stomach pain") || symptomsLower.contains("diarrhea")) {
            return "Gastroenteritis";
        } else {
            return "Common Cold";
        }
    }

    private Double calculateConfidence(String symptoms) {
        // Simple confidence calculation based on symptom count
        int symptomCount = symptoms.split(",").length;
        return Math.min(50.0 + (symptomCount * 10.0), 95.0);
    }

    private String determineSeverity(String disease) {
        switch (disease.toLowerCase()) {
            case "heart disease":
            case "diabetes":
                return "HIGH";
            case "migraine":
            case "arthritis":
            case "gastroenteritis":
                return "MEDIUM";
            default:
                return "LOW";
        }
    }

    private String getRecommendations(String disease) {
        switch (disease.toLowerCase()) {
            case "flu":
                return "Rest, drink plenty of fluids, take over-the-counter medications for fever";
            case "migraine":
                return "Rest in a quiet dark room, apply cold compress, consult neurologist";
            case "heart disease":
                return "Seek immediate medical attention, avoid strenuous activity, maintain healthy diet";
            case "arthritis":
                return "Physical therapy, anti-inflammatory medications, maintain healthy weight";
            case "diabetes":
                return "Monitor blood sugar regularly, maintain healthy diet, regular exercise, consult endocrinologist";
            case "skin allergy":
                return "Avoid allergens, use prescribed creams, consult dermatologist";
            case "gastroenteritis":
                return "Stay hydrated, eat bland foods, rest, seek medical help if severe";
            default:
                return "Rest, maintain hygiene, consult doctor if symptoms persist";
        }
    }

    private PredictionResponse convertToResponse(Prediction prediction) {
        return PredictionResponse.builder()
                .id(prediction.getId())
                .symptoms(prediction.getSymptoms())
                .predictedDisease(prediction.getPredictedDisease())
                .confidenceScore(prediction.getConfidenceScore())
                .severity(prediction.getSeverity())
                .recommendations(prediction.getRecommendations())
                .userName(prediction.getUserName())
                .userEmail(prediction.getUserEmail())
                .createdAt(prediction.getCreatedAt())
                .build();
    }
}
