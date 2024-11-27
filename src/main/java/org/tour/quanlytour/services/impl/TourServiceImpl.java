package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.TourRequest;
import org.tour.quanlytour.entites.Tour;
import org.tour.quanlytour.mapper.TourMapper;
import org.tour.quanlytour.repository.TourRepository;
import org.tour.quanlytour.services.service.TourService;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {
    private final TourRepository tourRepository;
    private final TourMapper tourMapper;
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
        try{
            Tour tour = tourMapper.toTour(request);
            return tourRepository.save(tour);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Tour updateTour(Long id, TourRequest request) {
       try{

              Tour tour = tourRepository.findById(id).orElseThrow(() -> new RuntimeException("Tour not found"));
              if(request.getName() != null) {
                  tour.setName(request.getName());
              }
                if(request.getDescription() != null) {
                    tour.setDescription(request.getDescription());
                }
                if(request.getHighlight() != null) {
                    tour.setHighlight(request.getHighlight());
                }
                if(request.getStartDate() != null) {
                    tour.setStartDate(request.getStartDate());
                }
                if(request.getEndDate() != null) {
                    tour.setEndDate(request.getEndDate());
                }
                if(request.getDuration() != null) {
                    tour.setDuration(request.getDuration());
                }
                if(request.getDeparture() != null) {
                    tour.setDeparture(request.getDeparture());
                }
                if(request.getPrice() != 0) {
                    tour.setPrice(request.getPrice());
                }
                return tourRepository.save(tour);
       }catch (Exception e) {
           throw new RuntimeException(e.getMessage());
       }
    }

    @Override
    public void deleteTour(Long id) {
        try{
            tourRepository.deleteById(id);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }


}
