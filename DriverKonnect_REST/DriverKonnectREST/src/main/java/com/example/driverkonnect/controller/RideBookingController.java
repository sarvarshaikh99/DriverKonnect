package com.example.driverkonnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.driverkonnect.dto.RideBookingRequest;
import com.example.driverkonnect.entity.RideBooking;
import com.example.driverkonnect.entity.enums.BookingStatus;
import com.example.driverkonnect.service.RideBookingService;

@CrossOrigin(origins = "https://localhost:3000")
@RestController
@RequestMapping("/api/ridebooking")
public class RideBookingController {

    @Autowired
    private RideBookingService rideBookingService;

    @PostMapping("/bookride")
    public ResponseEntity<RideBooking> bookRide(@RequestParam int customerId, @RequestBody RideBookingRequest request) {
        RideBooking bookedRide = rideBookingService.bookRide(customerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookedRide);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<RideBooking>> getRidesByCity(@PathVariable String city) {
        List<RideBooking> rides = rideBookingService.getRidesByCity(city);
        return ResponseEntity.ok(rides);
    }
    
    @PutMapping("/update/{rideId}")
    public ResponseEntity<RideBooking> updateDriverId(@PathVariable int rideId, @RequestParam int driverId) {
        try {
            RideBooking updatedRide = rideBookingService.updateDriverId(rideId, driverId);
            return ResponseEntity.ok(updatedRide);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PutMapping("/status/{rideId}")
    public ResponseEntity<RideBooking> updateBookingStatus(@PathVariable int rideId, @RequestParam BookingStatus bookingStatus) {
        try {
            RideBooking updatedRide = rideBookingService.updateBookingStatus(rideId, bookingStatus);
            return ResponseEntity.ok(updatedRide);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
