package org.tour.quanlytour.repository;

import  org.tour.quanlytour.entites.Destination;
import  org.tour.quanlytour.entites.DestinationAmenity;
import  org.tour.quanlytour.entites.PopularAmenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationAmenityRepository  extends JpaRepository<DestinationAmenity,Long> {

    List<DestinationAmenity> findByDestinationId(Long destinationId);

    boolean existsByDestinationAndAmenity(Destination destination, PopularAmenity popularAmenity);
}
