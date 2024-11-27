package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.ItineraryRequest;
import org.tour.quanlytour.entites.Itinerary;
import org.tour.quanlytour.repository.ItineraryRepository;

import java.util.List;

public interface ItineraryService {
    Itinerary createItinerary(ItineraryRequest request);
    Itinerary updateItinerary(Long id,ItineraryRequest request);
    void deleteItinerary(Long id);
    Itinerary getItineraryById(Long id);
    List<Itinerary> getItineraryByTour(Long id);
}
