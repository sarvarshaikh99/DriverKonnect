package com.example.driverkonnect.dto;

import java.time.LocalDateTime;

import com.example.driverkonnect.entity.enums.ChargesType;
import com.example.driverkonnect.entity.enums.PaymentMethod;

public class RideBookingRequest {
    private LocalDateTime rideDate;
    private String pickupAddress;
    private String pickupCity;
    private ChargesType chargeType; // This should match ENUM values in ChargesSlab
    private int rideQuantity;
    private PaymentMethod paymentMethod;
	public LocalDateTime getRideDate() {
		return rideDate;
	}
	public void setRideDate(LocalDateTime rideDate) {
		this.rideDate = rideDate;
	}
	public String getPickupAddress() {
		return pickupAddress;
	}
	public void setPickupAddress(String pickupAddress) {
		this.pickupAddress = pickupAddress;
	}
	public String getPickupCity() {
		return pickupCity;
	}
	public void setPickupCity(String pickupCity) {
		this.pickupCity = pickupCity;
	}
	public ChargesType getChargeType() {
		return chargeType;
	}
	public void setChargeType(ChargesType chargeType) {
		this.chargeType = chargeType;
	}
	public int getRideQuantity() {
		return rideQuantity;
	}
	public void setRideQuantity(int rideQuantity) {
		this.rideQuantity = rideQuantity;
	}
	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

    // Getters and Setters
    
}
