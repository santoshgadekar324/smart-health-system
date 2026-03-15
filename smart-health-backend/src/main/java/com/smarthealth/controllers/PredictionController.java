package com.smarthealth.controllers;

import com.smarthealth.dto.ApiResponse;
import com.smarthealth.dto.PredictionRequest;
import com.smarthealth.dto.PredictionResponse;
import com.smarthealth.services.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping
    public ResponseEntity<ApiResponse> predictDisease(@Valid @RequestBody PredictionRequest request) {
        try {
            PredictionResponse response = predictionService.predictDisease(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Prediction completed successfully", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<PredictionResponse>> getAllPredictions() {
        List<PredictionResponse> predictions = predictionService.getAllPredictions();
        return ResponseEntity.ok(predictions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PredictionResponse> getPredictionById(@PathVariable Long id) {
        try {
            PredictionResponse prediction = predictionService.getPredictionById(id);
            return ResponseEntity.ok(prediction);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PredictionResponse>> getPredictionsByUser(@PathVariable Long userId) {
        List<PredictionResponse> predictions = predictionService.getPredictionsByUser(userId);
        return ResponseEntity.ok(predictions);
    }
}
