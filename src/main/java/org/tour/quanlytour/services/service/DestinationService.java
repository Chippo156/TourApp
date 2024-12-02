package org.tour.quanlytour.services.service;

import org.springframework.data.domain.Page;
import org.tour.quanlytour.dtos.request.DestinationRequest;
import org.tour.quanlytour.dtos.response.DestinationResponse;
import org.tour.quanlytour.entites.Destination;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DestinationService {
    Destination createDestination(DestinationRequest destinationRequest) throws Exception;

    Destination getDestination(Long id);

    DestinationResponse updateDestination(Long id, DestinationRequest destinationRequest);

    Page<Destination> getAllDestinations(int page, int size);

    void deleteDestination(Long id);

    List<Destination> getDestinationByCategory(Long categoryId);

    void updateImage(Long id, String imageUrl);

    Page<Destination> filterDestination(String search,String location, Long categoryId, Double averageRating, Double price,List<Long> amenityIds, Integer sleeps, LocalDate startDate, LocalDate endDate,int page, int size);
    List<Destination> getDestinationByLocation(String location);
    List<Destination> findAvailableDestinations(String startDate, String endDate);

    List<Destination> searchDestination(String search);
}
