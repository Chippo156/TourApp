package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.entites.Itinerary;
import org.tour.quanlytour.services.service.ItineraryService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItineraryServiceImpl implements ItineraryService {

    @Override
    public Itinerary createItinerary(Itinerary itinerary) {
        return null;
    }

    @Override
    public Itinerary updateItinerary(Long id, Itinerary itinerary) {
        return null;
    }

    @Override
    public void deleteItinerary(Long id) {

    }

    @Override
    public Itinerary getItineraryById(Long id) {
        return null;
    }

    @Override
    public List<Itinerary> getAllItinerary() {
        return null;
    }
}
