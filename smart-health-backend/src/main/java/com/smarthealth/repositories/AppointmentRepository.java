package com.smarthealth.repositories;

import com.smarthealth.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByPatientId(Long patientId);
    
    List<Appointment> findByDoctorId(Long doctorId);
    
    List<Appointment> findByStatus(String status);
    
    Long countByStatus(String status);
    
    List<Appointment> findByAppointmentDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.id = ?1 AND a.appointmentDate = ?2")
    Long countByDoctorAndDate(Long doctorId, LocalDate date);
}
