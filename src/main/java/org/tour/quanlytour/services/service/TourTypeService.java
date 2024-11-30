package org.tour.quanlytour.services.service;

import org.tour.quanlytour.entites.TourType;

import java.util.List;

public interface TourTypeService {
    List<TourType> getAllTourType();
    void saveTourType(TourType tourType);

}
