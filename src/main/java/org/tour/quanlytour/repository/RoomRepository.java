package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.tour.quanlytour.entites.Room;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByDestinationId(Long destinationId);

    List<Room> findByRoomType(String roomType);

    Room findDistinctFirstByDestinationId(Long destinationId);

    @Query("SELECT r FROM Room r  WHERE " +
            "(:destinationId IS NULL OR r.destination.id = :destinationId) AND " +
            "(:sleeps IS NULL OR r.sleeps >= :sleeps) AND " +
            "(:quantity IS NULL OR r.quantity >= :quantity) AND " +
            "(:startDate IS NULL OR :endDate IS NULL OR " +
            "NOT EXISTS (SELECT 1 FROM Bookings b WHERE b.room.id = r.id AND " +
            "((b.checkInDate <= :endDate AND b.checkOutDate >= :startDate))))")
    List<Room> findAvailableRooms(
            @Param("destinationId") Long destinationId,
            @Param("sleeps") Integer sleeps,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("quantity") Integer quantity);
}

