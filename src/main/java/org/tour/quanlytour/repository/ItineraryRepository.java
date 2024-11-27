package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.Itinerary;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long>{
}
