package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.entites.TourType;
import org.tour.quanlytour.repository.TourTypeRepository;
import org.tour.quanlytour.services.service.TourTypeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourTypeServiceImpl implements TourTypeService {
    private final TourTypeRepository tourTypeRepository;
    @Override
    public List<TourType> getAllTourType() {
        try{
         return   tourTypeRepository.findAll();


        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void saveTourType(TourType tourType) {
        try{
            tourTypeRepository.save(tourType);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }
}
