package com.example.driverkonnect.repository;

import com.example.driverkonnect.entity.ChargesSlab;
import com.example.driverkonnect.entity.enums.ChargesType;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargesSlabRepository extends JpaRepository<ChargesSlab, Integer> {

	Optional<ChargesSlab> findByChargesType(ChargesType chargesType);
}
