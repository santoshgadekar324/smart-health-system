package com.smarthealth.repositories;

import com.smarthealth.models.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    
    List<Prediction> findByUserId(Long userId);
    
    List<Prediction> findByPredictedDisease(String disease);
    
    @Query("SELECT p.predictedDisease, COUNT(p) FROM Prediction p GROUP BY p.predictedDisease ORDER BY COUNT(p) DESC")
    List<Object[]> findDiseaseDistribution();
    
    @Query("SELECT p.predictedDisease, COUNT(p) FROM Prediction p GROUP BY p.predictedDisease ORDER BY COUNT(p) DESC")
    List<Object[]> findTopDiseases();
}
