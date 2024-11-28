package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.TourImage;

import java.util.List;

public interface TourImageRepository extends JpaRepository<TourImage, Long> {
   List<TourImage> findAllByTourId(Long tourId);
}
