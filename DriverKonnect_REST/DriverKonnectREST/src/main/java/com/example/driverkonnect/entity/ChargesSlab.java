package com.example.driverkonnect.entity;

import com.example.driverkonnect.entity.enums.ChargesType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chargesslab")
public class ChargesSlab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "charges_id")
    private int chargesId;

    @Enumerated(EnumType.STRING)
    @Column(name = "charges_type")
    private ChargesType chargesType;

    @Column(name = "charges")
    private int charges;

    // Getters and Setters

    public int getChargesId() {
        return chargesId;
    }

    public void setChargesId(int chargesId) {
        this.chargesId = chargesId;
    }

    public ChargesType getChargesType() {
        return chargesType;
    }

    public void setChargesType(ChargesType chargesType) {
        this.chargesType = chargesType;
    }

    public int getCharges() {
        return charges;
    }

    public void setCharges(int charges) {
        this.charges = charges;
    }
}
