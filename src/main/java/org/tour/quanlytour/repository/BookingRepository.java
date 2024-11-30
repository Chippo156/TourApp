package org.tour.quanlytour.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.tour.quanlytour.entites.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Bookings, Long>{
    @Query("select b from Bookings b where b.user.id = :userId order by b.createdAt desc")
    public List<Bookings> findByUserId(@Param("userId") Long userId);
}
