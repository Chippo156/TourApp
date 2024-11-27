package org.tour.quanlytour.services.service;

import org.tour.quanlytour.entites.Itinerary;
import org.tour.quanlytour.repository.ItineraryRepository;

import java.util.List;

public interface ItineraryService {
    Itinerary createItinerary(Itinerary itinerary);
    Itinerary updateItinerary(Long id,Itinerary itinerary);
    void deleteItinerary(Long id);
    Itinerary getItineraryById(Long id);
    List<Itinerary> getAllItinerary();
}
