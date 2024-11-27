package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.Tour;

public interface TourRepository extends JpaRepository<Tour, Long> {
}
