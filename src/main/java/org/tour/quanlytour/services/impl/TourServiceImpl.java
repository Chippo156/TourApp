package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.TourRequest;
import org.tour.quanlytour.entites.Tour;
import org.tour.quanlytour.entites.TourType;
import org.tour.quanlytour.mapper.TourMapper;
import org.tour.quanlytour.repository.TourRepository;
import org.tour.quanlytour.repository.TourTypeRepository;
import org.tour.quanlytour.services.service.TourService;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {
    private final TourRepository tourRepository;
    private final TourMapper tourMapper;
    private final TourTypeRepository tourTypeRepository;

    @Override
    public Page<Tour> getAllTour(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return tourRepository.findAll(pageable);

    }

    @Override
    public Tour getTourById(Long id) {
        return tourRepository.findById(id).orElseThrow(() -> new RuntimeException("Tour not found"));
    }

    @Override
    public Tour createTour(TourRequest request) {
        try {
            Tour tour = tourMapper.toTour(request);
            TourType tourType = tourTypeRepository.findById(request.getTourTypeId()).orElseThrow(() -> new RuntimeException("Tour type not found"));
            tour.setTourType(tourType);
            return tourRepository.save(tour);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Tour updateTour(Long id, TourRequest request) {
        try {
            Tour tour = tourRepository.findById(id).orElseThrow(() -> new RuntimeException("Tour not found"));
            if (request.getName() != null) {
                tour.setName(request.getName());
            }
            if (request.getDescription() != null) {
                tour.setDescription(request.getDescription());
            }
            if (request.getHighlight() != null) {
                tour.setHighlight(request.getHighlight());
            }
            if (request.getDuration() != null) {
                tour.setDuration(request.getDuration());
            }
            if (request.getDeparture() != null) {
                tour.setDeparture(request.getDeparture());
            }
            if (request.getPrice() != 0) {
                tour.setPrice(request.getPrice());
            }
            if (request.getRating() != 0) {
                tour.setRating(request.getRating());
            }
            if (request.getSchedule() != null) {
                tour.setSchedule(request.getSchedule());
            }
            return tourRepository.save(tour);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    @Override
    public void deleteTour(Long id) {
        try {
            tourRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void updateTourImage(Long id, String url) {
        try {
            Tour tour = tourRepository.findById(id).orElseThrow();
            tour.setImageUrl(url);
            tourRepository.save(tour);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Page<Tour> filterTour(Double minPrice, Double maxPrice, Double rating, String duration, Long tourTypeId, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return tourRepository.filterTour(minPrice, maxPrice, rating, duration, tourTypeId, pageable);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void fakeData() {
        String[] duration = {"3 days 2 nights", "4 days 3 nights", "5 days 4 nights", "6 days 5 nights"};
        String[] schedule = {"Every Monday", "Every Tuesday", "Every Wednesday", "Every Thursday", "Every Friday", "Every Saturday"};
        String[] highlights = {
                "Romantic strolls through Da Lat's Valley of Love. Picturesque waterfalls. Colorful flower gardens.",
                "Relaxing on Phu Quoc's pristine beaches. Exploring vibrant night markets. Snorkeling in crystal-clear waters.",
                "Trekking Sapa's terraced rice fields. Visiting ethnic villages. Conquering Fansipan Mountain by cable car.",
                "Discovering the charm of Hoi An Ancient Town. Enjoying the stunning beaches of Da Nang.",
                "Exploring Can Tho's floating markets. Taking a sampan ride through Mekong canals. Tasting tropical fruits.",
                "Snorkeling in Nha Trang. Relaxing at luxury resorts. Visiting the iconic Po Nagar Cham Towers.",
                "Road-tripping through Ha Giang's majestic mountain passes. Dong Van Plateau. Colorful local markets.",
                "Cruising through Halong Bay’s limestone karsts. Kayaking in hidden caves. Unwinding on Cat Ba Island.",
                "Exploring Hue's imperial citadel. Majestic royal tombs. Enjoying a boat ride on the Perfume River.",
                "Sliding down Mui Ne's white sand dunes. Exploring the fairy stream. Savoring fresh seafood by the coast.",
                "Admiring Sa Dec's colorful flower fields. Visiting ancient French-style villas. Enjoying local specialties.",
                "Exploring Quang Binh's stunning caves, including Phong Nha and Paradise caves. Lush national parks.",
                "Climbing Ba Den Mountain. Learning about Cao Dai religion. Enjoying panoramic views of Tay Ninh.",
                "Swimming at Quy Nhon's Ky Co Beach. Hiking Eo Gio cliffs. Experiencing authentic fishing village life."
        };

        Faker faker = new Faker();
        String[] departure = {"Ha Noi", "Ho Chi Minh", "Da Nang", "Hue", "Nha Trang", "Da Lat", "Vung Tau", "Phu Quoc", "Can Tho", "Hai Phong", "Quang Ninh", "Lao Cai", "Dong Nai", "Binh Duong"};
        String[] tours = {
                "Exploring the romantic city of Da Lat with its beautiful waterfalls and flower gardens",
                "Discovering the paradise island of Phu Quoc with white sandy beaches and crystal-clear waters",
                "Hanoi to Sapa journey: Experience the charm of Vietnam's northern highlands",
                "Hoi An and Da Nang cultural tour with ancient town visits and stunning beaches",
                "Mekong Delta adventure: Boat rides and exploring the vibrant floating markets in Can Tho",
                "Nha Trang and Cam Ranh Bay getaway: Relax at luxurious resorts and pristine beaches",
                "Ha Giang loop: A breathtaking road trip through majestic mountain passes and rice terraces",
                "Halong Bay and Cat Ba Island cruise: Witness the natural wonder of limestone karsts",
                "Hue heritage tour: Visit the imperial city, royal tombs, and historic pagodas",
                "Binh Thuan and Mui Ne desert escape: Sand dunes, fishing villages, and fresh seafood",
                "Sa Dec flower village tour: A colorful journey into the heart of Vietnam's floral industry",
                "Quang Binh adventure: Explore the majestic Phong Nha and Son Doong caves",
                "Tay Ninh pilgrimage: Conquer Ba Den Mountain and learn about Cao Dai religion",
                "Quy Nhon coastal discovery: Visit Eo Gio, Ky Co Beach, and local fishing villages"
        };
        for (int i = 0; i < 14; i++) {
            Tour tour = new Tour();
            tour.setName(tours[i]);
            tour.setDescription(faker.lorem().characters(100, 200));
            tour.setHighlight(highlights[i]);
            tour.setSchedule(schedule[faker.random().nextInt(0, 5)]);
            tour.setDuration(duration[faker.random().nextInt(0, 3)]);
            tour.setDeparture(departure[faker.random().nextInt(0, 13)]);
            tour.setPrice(faker.number().randomDouble(2, 1000000, 10000000));
            tour.setRating(faker.number().randomDouble(1, 4, 5));
            tour.setImageUrl(faker.internet().image());
            tour.setTourType(tourTypeRepository.findById((long) faker.random().nextInt(1, 4)).orElseThrow(() -> new RuntimeException("Tour type not found")));
            tourRepository.save(tour);
        }
    }


}
