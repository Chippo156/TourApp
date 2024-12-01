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
        String[] activities = {
                "You have breakfast at the hotel, then depart for Muangboran (Ancient City) - a miniature Thailand with a system of architectural works built exactly like the original. Coming here, visitors can rent a traditional Thai costume to take extremely sparkling photos.The group had lunch at the restaurant.The whole group will visit famous destinations.In addition, the campus around the mountain also has many beautiful flower gardens for visitors to enjoy.The next destination on the Thailand tour from Ho Chi Minh is the Four Regions Floating Market: You are free to visit and enjoy authentic Thai dishes. In particular, some shops in the market have Vietnamese signs to conveniently identify prices and items while also bringing closeness to Vietnamese customers.You will experience a very refreshing traditional Thai Massage after a long day of travel. Professional massage therapists press acupressure points all over the body, awakening visitors' body senses.",
                "You gather at the international airport - Tan Son Nhat airport at 2:15 p.m., check in for flight VJ805 at 5:15 p.m. to Bangkok.Arriving at Suvanabhumi Airport, Thailand, the group went through immigration procedures. After that, the tour guide takes you to dinner, then the group returns to the hotel to check in and rest.",
                "5:30: Tour guide and group go to Can Tho pier, visit Cai Rang floating market early in the morning. When the sun still shines on the dew drops like sparkling pearls in the early morning, you will have the opportunity to immerse yourself in the bustle and excitement, learning about the typical lifestyle of the residents of the river region.Next, you check out of the hotel and have lunch.The car took the group back to Ho Chi Minh City. When you arrive, the car will return you to the original pick up point.End of 2-day Western tour, see you again!",
                "Take a roller coaster ride down to the base of Datanla Waterfall",
                "Visit the Domaine De Marie Church in Da Lat. Enjoy the stunning French colonial architecture. Learn about the church's rich history. ",
                "You gather at the international airport - Tan Son Nhat airport at 2:15 p.m., check in for flight VJ805 at 5:15 p.m. to Bangkok.Arriving at Suvanabhumi Airport, Thailand, the group went through immigration procedures. After that, the tour guide takes you to dinner, then the group returns to the hotel to check in and rest.",
                "You have breakfast at the hotel, then depart for Muangboran (Ancient City) - a miniature Thailand with a system of architectural works built exactly like the original. Coming here, visitors can rent a traditional Thai costume to take extremely sparkling photos.The group had lunch at the restaurant.The whole group will visit famous destinations.In addition, the campus around the mountain also has many beautiful flower gardens for visitors to enjoy.The next destination on the Thailand tour from Ho Chi Minh is the Four Regions Floating Market: You are free to visit and enjoy authentic Thai dishes. In particular, some shops in the market have Vietnamese signs to conveniently identify prices and items while also bringing closeness to Vietnamese customers.You will experience a very refreshing traditional Thai Massage after a long day of travel. Professional massage therapists press acupressure points all over the body, awakening visitors' body senses.",

        };

        for (int i = 21; i <= 34; i++) {
            Tour tour = tourRepository.findById((long) i).orElseThrow(() -> new RuntimeException("Tour not found"));
            if ("3 days 2 nights".equals(tour.getDuration())) {
                for (int j = 0; j < 3; j++) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.setTour(tour);
                    itinerary.setDay(day[j]);
                    itinerary.setActivities(activities[j]);
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
                    itinerary.setActivities(activities[j]);
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
