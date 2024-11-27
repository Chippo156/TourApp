package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.Itinerary;

import java.util.List;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long>{
    List<Itinerary> findByTourId(Long id);
}
