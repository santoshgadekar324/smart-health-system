package com.smarthealth.services;

import com.smarthealth.dto.*;
import com.smarthealth.models.Doctor;
import com.smarthealth.models.User;
import com.smarthealth.repositories.DoctorRepository;
import com.smarthealth.repositories.UserRepository;
import com.smarthealth.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .phone(request.getPhone())
                .age(request.getAge())
                .gender(request.getGender())
                .address(request.getAddress())
                .isActive(true)
                .build();

        User savedUser = userRepository.save(user);

        // If registering as doctor, create doctor profile
        if ("DOCTOR".equalsIgnoreCase(request.getRole())) {
            if (doctorRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Doctor profile already exists");
            }

            Doctor doctor = Doctor.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .specialization(request.getSpecialization())
                    .qualification(request.getQualification())
                    .experienceYears(request.getExperienceYears())
                    .phone(request.getPhone())
                    .consultationFee(request.getConsultationFee())
                    .availableDays(request.getAvailableDays())
                    .availableTime(request.getAvailableTime())
                    .hospitalAffiliation(request.getHospitalAffiliation())
                    .isAvailable(true)
                    .rating(0.0)
                    .totalPatients(0)
                    .build();

            doctorRepository.save(doctor);
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .role(savedUser.getRole())
                .message("Registration successful")
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .message("Login successful")
                .build();
    }
}
