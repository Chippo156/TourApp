package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.request.TourRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.ListTourResponse;
import org.tour.quanlytour.dtos.response.TourResponse;
import org.tour.quanlytour.entites.Tour;
import org.tour.quanlytour.mapper.TourMapper;
import org.tour.quanlytour.services.service.TourService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/tours")
public class TourController {
    private final TourService tourService;
    private final TourMapper tourMapper;
    @PostMapping
    public ApiResponse<TourResponse> createTour(@RequestBody TourRequest request) {
        try{
           return new ApiResponse<>(200,"success",tourMapper.toTourResponse(tourService.createTour(request)));
        }
        catch (Exception e) {
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }
    @GetMapping
    public ApiResponse<ListTourResponse> getAllTour(@RequestParam int page, @RequestParam int size) {
        try{
            List<Tour> tours = tourService.getAllTour(page, size).getContent();
            List<TourResponse> tourResponses = tours.stream().map(tourMapper::toTourResponse).toList();
            ListTourResponse t = ListTourResponse.builder()
                    .tours(tourResponses)
                    .totalPage(tourService.getAllTour(page, size).getTotalPages())
                    .totalElement(tourService.getAllTour(page, size).getNumberOfElements())
                    .build();
            return new ApiResponse<>(200,"success",t);
        }
        catch (Exception e) {
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }
    @GetMapping("/{id}")
    public ApiResponse<TourResponse> getTourById(@PathVariable Long id) {
        try{
            return new ApiResponse<>(200,"success",tourMapper.toTourResponse(tourService.getTourById(id)));
        }
        catch (Exception e) {
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteTour(@PathVariable Long id) {
        try{
            tourService.deleteTour(id);
            return new ApiResponse<>(200,"success",null);
        }
        catch (Exception e) {
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }
    @PutMapping("/{id}")
    public ApiResponse<TourResponse> updateTour(@PathVariable Long id, @RequestBody TourRequest request) {
        try{
            return new ApiResponse<>(200,"success",tourMapper.toTourResponse(tourService.updateTour(id,request)));
        }
        catch (Exception e) {
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }

}
