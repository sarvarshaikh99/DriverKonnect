package com.example.driverkonnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.driverkonnect.entity.RideBooking;

@Repository
public interface RideBookingRepository extends JpaRepository<RideBooking, Integer> {
    List<RideBooking> findByPickupCity(String pickupCity);
}
