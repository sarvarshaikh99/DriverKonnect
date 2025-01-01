package com.example.driverkonnect.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.driverkonnect.dto.RideBookingRequest;
import com.example.driverkonnect.entity.ChargesSlab;
import com.example.driverkonnect.entity.Customer;
import com.example.driverkonnect.entity.RideBooking;
import com.example.driverkonnect.entity.enums.BookingStatus;
import com.example.driverkonnect.repository.ChargesSlabRepository;
import com.example.driverkonnect.repository.RideBookingRepository;

import jakarta.transaction.Transactional;

@Service
public class RideBookingService {

    @Autowired
    private RideBookingRepository rideBookingRepository;

    @Autowired
    private ChargesSlabRepository chargesSlabRepository;
    
    public int calculateBillAmount(int charges, int rideQuantity) {
        // Calculate BillAmount using integer multiplication
        return charges * rideQuantity;
    }

    @Transactional
    public RideBooking bookRide(int customerId, RideBookingRequest request) {
        ChargesSlab chargesSlab = chargesSlabRepository.findByChargesType(request.getChargeType())
                .orElseThrow(() -> new RuntimeException("Invalid charge type"));

        // Fetch charges from ChargesSlab and calculate billAmount
        int charges = chargesSlab.getCharges();
        int rideQuantity = request.getRideQuantity();
        int billAmount = calculateBillAmount(charges, rideQuantity);

        RideBooking rideBooking = new RideBooking();
        rideBooking.setCustomer(new Customer(customerId)); // Assuming you have a constructor that accepts ID
        rideBooking.setRideDate(request.getRideDate());
        rideBooking.setPickupAddress(request.getPickupAddress());
        rideBooking.setPickupCity(request.getPickupCity());
        rideBooking.setChargesSlab(chargesSlab);
        rideBooking.setRideQuantity(rideQuantity);
        rideBooking.setBillAmount(billAmount);
        rideBooking.setPaymentMethod(request.getPaymentMethod());
        rideBooking.setBookingDate(LocalDateTime.now());

        return rideBookingRepository.save(rideBooking);
    }

    public List<RideBooking> getRidesByCity(String city) {
        return rideBookingRepository.findByPickupCity(city);
    }
    
    public RideBooking updateDriverId(int rideId, int driverId) {
        RideBooking rideBooking = rideBookingRepository.findById(rideId).orElseThrow(() -> new RuntimeException("Ride not found"));
        rideBooking.setDriverId(driverId);
        return rideBookingRepository.save(rideBooking);
    }
    
    public RideBooking updateBookingStatus(int rideId, BookingStatus bookingStatus) {
        RideBooking rideBooking = rideBookingRepository.findById(rideId).orElseThrow(() -> new RuntimeException("Ride not found"));
        rideBooking.setBookingStatus(bookingStatus);
        return rideBookingRepository.save(rideBooking);
    }
}
