package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.RoomImage;

import java.util.List;

public interface RoomImageRepository extends JpaRepository<org.tour.quanlytour.entites.RoomImage, Long> {
    List<org.tour.quanlytour.entites.RoomImage> findAllByRoomId(Long roomId);
}
