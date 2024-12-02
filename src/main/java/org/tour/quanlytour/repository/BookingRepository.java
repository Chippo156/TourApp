package org.tour.quanlytour.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.tour.quanlytour.entites.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Bookings, Long>{
    @Query("select b from Bookings b where b.user.id = :userId order by b.createdAt desc")
    public List<Bookings> findByUserId(@Param("userId") Long userId);
    @Query("select b from Bookings b where b.destination is not null")
    Page<Bookings> findByDestinationIsNotEmpty(Pageable pageable);

    @Query("select b from Bookings b where b.tour is not null")
    Page<Bookings> findByTourIsNotEmpty(Pageable pageable);

    @Query("select b from Bookings b where b.user.id = :userId and b.bookingStatus = 'CANCELLED' order by b.createdAt desc")
    Page<Bookings> findByBookingCancel(Long userId, Pageable pageable);

    @Query("select b from Bookings b where b.user.id = :userId and b.destination is not null order by b.createdAt desc")
    Page<Bookings> findByUserDestinationIsNotEmpty(Long userId,Pageable pageable);

    @Query("select b from Bookings b where b.user.id = :userId and b.tour is not null order by b.createdAt desc")
    Page<Bookings> findByUserTourIsNotEmpty(Long userId,Pageable pageable);
}
