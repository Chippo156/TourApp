package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.TourImageRequest;
import org.tour.quanlytour.entites.Room;
import org.tour.quanlytour.entites.RoomImage;
import org.tour.quanlytour.entites.Tour;
import org.tour.quanlytour.entites.TourImage;
import org.tour.quanlytour.repository.TourImageRepository;
import org.tour.quanlytour.repository.TourRepository;
import org.tour.quanlytour.services.service.TourImageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourImageServiceImpl implements TourImageService {
    private final TourImageRepository tourImageRepository;
    private final TourRepository tourRepository;

    @Override
    public TourImage uploadImage(Long tourId, TourImageRequest request) {
        try {
            Tour tour = tourRepository.findById(tourId).orElseThrow(() -> new RuntimeException("Tour not found"));
            TourImage tourImage = new TourImage();
            tourImage.setTour(tour);
            tourImage.setImageUrl(request.getImageUrl());
            int size = tourImageRepository.findAllByTourId(tourId).size();
            if (size >= 7) {
                throw new RuntimeException("You can't upload more than 7 images");
            } else {
                return tourImageRepository.save(tourImage);
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<TourImage> get(Long roomId) {
        return tourImageRepository.findAllByTourId(roomId);
    }
}
