package com.example.driverkonnect.entity;

import java.time.LocalDateTime;

import com.example.driverkonnect.entity.enums.BookingStatus;
import com.example.driverkonnect.entity.enums.PaymentMethod;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "ride_booking")
public class RideBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ride_id")
    private int rideId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "charge_id", nullable = false)
    private ChargesSlab chargesSlab;
    
    @Column(name = "driver_id")
    private int driverId;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "ride_date")
    private LocalDateTime rideDate;

    @Column(name = "pickup_address")
    private String pickupAddress;

    @Column(name = "pickup_city")
    private String pickupCity;

    @Column(name = "ride_quantity")
    private int rideQuantity;

    @Column(name = "bill_amount")
    private int billAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "booking_status")
    private BookingStatus bookingStatus;

	@Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    // Getters and Setters

    public int getRideId() {
        return rideId;
    }

    public void setRideId(int rideId) {
        this.rideId = rideId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ChargesSlab getChargesSlab() {
        return chargesSlab;
    }

    public void setChargesSlab(ChargesSlab chargesSlab) {
        this.chargesSlab = chargesSlab;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

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

    public int getRideQuantity() {
        return rideQuantity;
    }

    public void setRideQuantity(int rideQuantity) {
        this.rideQuantity = rideQuantity;
    }

    public int getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(int billAmount) {
        this.billAmount = billAmount;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

	public int getDriverId() {
		return driverId;
	}

	public void setDriverId(int driverId) {
		this.driverId = driverId;
	}
	
	public BookingStatus getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(BookingStatus bookingStatus) {
		this.bookingStatus = bookingStatus;
	}


}
