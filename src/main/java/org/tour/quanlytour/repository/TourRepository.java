package org.tour.quanlytour.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.tour.quanlytour.entites.Tour;

public interface TourRepository extends JpaRepository<Tour, Long> {



    @Query("select t from Tour t where " +
            "(:tourTypeId is NULL OR t.tourType.id = :tourTypeId) "+
            "and (:minPrice is NULL OR t.price >= :minPrice )" +
            "and (:maxPrice is NULL OR t.price <= :maxPrice )" +
            "and (:rating is NULL OR t.rating >= :rating) " +
            "and (:duration is NULL OR t.duration like %:duration%)")
    Page<Tour> filterTour(
            @Param("minPrice") Double minPrice,
           @Param("maxPrice") Double maxPrice,
           @Param("rating") Double rating,
           @Param("duration") String duration,
            @Param("tourTypeId") Long tourTypeId
            , Pageable pageable);
}
