package org.tour.quanlytour.services.service;

import org.springframework.data.domain.Page;
import org.tour.quanlytour.dtos.request.TourRequest;
import org.tour.quanlytour.entites.Tour;

public interface TourService {
    Page<Tour> getAllTour(int page, int size);
    Tour getTourById(Long id);
    Tour createTour(TourRequest tourRequest);
    Tour updateTour(Long id, TourRequest tourRequest);
    void deleteTour(Long id);
    void updateTourImage(Long id, String url);
    Page<Tour> filterTour(Double minPrice, Double maxPrice, Double rating, String duration,Long tourTypeId, int page, int size);

    void fakeData();

}
