package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.RoomImageRequest;
import org.tour.quanlytour.dtos.request.TourImageRequest;
import org.tour.quanlytour.entites.RoomImage;
import org.tour.quanlytour.entites.TourImage;

import java.util.List;

public interface TourImageService {

    TourImage uploadImage(Long tourId, TourImageRequest request);
    List<TourImage> get(Long roomId);
    void fakeData();
}
