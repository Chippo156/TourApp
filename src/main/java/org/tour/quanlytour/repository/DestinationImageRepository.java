package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.DestinationImage;
import java.util.List;

public interface DestinationImageRepository extends JpaRepository<DestinationImage, Long> {
    List<DestinationImage> findAllByDestinationId(Long destinationId);
}
