package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
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

    @Override
    public void fakeData() {
        Faker faker = new Faker();
        String[] day = {
                "Day 1: Arrive in Da Lat - Begin your journey by exploring the heart of the city. Visit Xuan Huong Lake, where you can enjoy a relaxing boat ride.",
                "Day 2: Nature and Adventure - Start the day with a visit to Datanla Waterfall, where you can enjoy the stunning natural beauty and even take a thrilling roller coaster ride down to the base.",
                "Day 3: Cultural and Historic Exploration - Begin with a visit to the Domaine De Marie Church, a beautiful French colonial structure with a rich history.",
                "Day 4: Arrive in Hoi An - Start your journey by exploring the charming ancient town of Hoi An. Visit the iconic Japanese Covered Bridge, a symbol of the town's rich history. e sunset.",
                "Day 5: Cultural and Culinary Delights - Begin with a visit to the Hoi An Museum of History and Culture to learn about the town's fascinating past.",
                "Day 6: Nature and Adventure - Start the day with a visit to the stunning Marble Mountains, where you can explore the ancient caves and pagodas."
        };

        for (int i = 21; i <= 34; i++) {
            Tour tour = tourRepository.findById((long) i).orElseThrow(() -> new RuntimeException("Tour not found"));
            if ("3 days 2 nights".equals(tour.getDuration())) {
                for (int j = 0; j < 3; j++) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.setTour(tour);
                    itinerary.setDay(day[j]);
                    itinerary.setActivities(faker.lorem().sentence());
                    itinerary.setTime(faker.lorem().sentence());
                    itineraryRepository.save(itinerary);
                }
            }
            if ("4 days 3 nights".equals(tour.getDuration())) {
                for (int j = 0; j < 4; j++) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.setTour(tour);
                    itinerary.setDay(day[j]);
                    itinerary.setActivities(faker.lorem().sentence());
                    itinerary.setTime(faker.lorem().sentence());
                    itineraryRepository.save(itinerary);
                }
            }
            if("5 days 4 nights".equalsIgnoreCase(tour.getDuration())){
                for (int j = 0; j < 5; j++) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.setTour(tour);
                    itinerary.setDay(day[j]);
                    itinerary.setActivities(faker.lorem().sentence());
                    itinerary.setTime(faker.lorem().sentence());
                    itineraryRepository.save(itinerary);
                }
            }
            if("6 days 5 nights".equalsIgnoreCase(tour.getDuration())){
                for (int j = 0; j < 6; j++) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.setTour(tour);
                    itinerary.setDay(day[j]);
                    itinerary.setActivities(faker.lorem().sentence());
                    itinerary.setTime(faker.lorem().sentence());
                    itineraryRepository.save(itinerary);
                }
            }
            if("2 days 1 night".equalsIgnoreCase(tour.getDuration())){
                for (int j = 0; j < 2; j++) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.setTour(tour);
                    itinerary.setDay(day[j]);
                    itinerary.setActivities(faker.lorem().sentence());
                    itinerary.setTime(faker.lorem().sentence());
                    itineraryRepository.save(itinerary);
                }
            }

        }

    }
}
