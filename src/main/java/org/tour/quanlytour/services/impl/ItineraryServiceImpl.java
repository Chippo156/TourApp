package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.ItineraryRequest;
import org.tour.quanlytour.entites.Itinerary;
import org.tour.quanlytour.entites.Tour;
import org.tour.quanlytour.mapper.ItineraryMapper;
import org.tour.quanlytour.repository.ItineraryRepository;
import org.tour.quanlytour.repository.TourRepository;
import org.tour.quanlytour.services.service.ItineraryService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItineraryServiceImpl implements ItineraryService {
    private final ItineraryRepository itineraryRepository;

    private final ItineraryMapper itineraryMapper;
    private final TourRepository tourRepository;

    @Override
    public Itinerary createItinerary(ItineraryRequest request) {
        try{
            Itinerary itinerary = itineraryMapper.toItinerary(request);
            Tour tour = tourRepository.findById(request.getTour_id()).orElseThrow(() -> new RuntimeException("Tour not found"));
            itinerary.setTour(tour);
            return itineraryRepository.save(itinerary);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public Itinerary updateItinerary(Long id, ItineraryRequest request) {
        try{
            Itinerary itinerary = itineraryRepository.findById(id).orElseThrow(() -> new RuntimeException("Itinerary not found"));
            Tour tour = tourRepository.findById(request.getTour_id()).orElseThrow(() -> new RuntimeException("Tour not found"));
            itinerary.setTour(tour);
            itinerary.setDay(request.getDay());
            if(request.getDay() != null) {
                itinerary.setDay(request.getDay());
            }
            if(request.getActivities() != null) {
                itinerary.setActivities(request.getActivities());
            }
            if(request.getTime() != null) {
                itinerary.setTime(request.getTime());
            }
            return itineraryRepository.save(itinerary);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());}
    }

    @Override
    public void deleteItinerary(Long id) {
        try{
            itineraryRepository.deleteById(id);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public Itinerary getItineraryById(Long id) {
        return itineraryRepository.findById(id).orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }

    @Override
    public List<Itinerary> getItineraryByTour(Long id) {
        return itineraryRepository.findByTourId(id);
    }
}
