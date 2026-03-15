package com.smarthealth.services;

import com.smarthealth.dto.DoctorResponse;
import com.smarthealth.models.Doctor;
import com.smarthealth.repositories.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public DoctorResponse getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return convertToResponse(doctor);
    }

    public DoctorResponse getDoctorByEmail(String email) {
        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return convertToResponse(doctor);
    }

    public List<DoctorResponse> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> getAvailableDoctors() {
        return doctorRepository.findByIsAvailable(true).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private DoctorResponse convertToResponse(Doctor doctor) {
        return DoctorResponse.builder()
                .id(doctor.getId())
                .name(doctor.getName())
                .email(doctor.getEmail())
                .specialization(doctor.getSpecialization())
                .qualification(doctor.getQualification())
                .experienceYears(doctor.getExperienceYears())
                .phone(doctor.getPhone())
                .consultationFee(doctor.getConsultationFee())
                .availableDays(doctor.getAvailableDays())
                .availableTime(doctor.getAvailableTime())
                .hospitalAffiliation(doctor.getHospitalAffiliation())
                .rating(doctor.getRating())
                .totalPatients(doctor.getTotalPatients())
                .isAvailable(doctor.getIsAvailable())
                .createdAt(doctor.getCreatedAt())
                .build();
    }
}
