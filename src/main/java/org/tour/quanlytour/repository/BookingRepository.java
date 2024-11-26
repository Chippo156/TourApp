package org.tour.quanlytour.repository;


import org.tour.quanlytour.entites.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Bookings, Long>{
    public List<Bookings> findByUserId(Long userId);
}
