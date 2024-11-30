package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.entites.TourType;
import org.tour.quanlytour.services.service.TourTypeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/tour-type")
public class TourTypeController {
    private final TourTypeService tourTypeService;

    @GetMapping
    public ApiResponse<List<TourType>> getAllTourType() {
      try{
            return new ApiResponse<>(200, "Get all tour type success", tourTypeService.getAllTourType());
        }
        catch (Exception e) {
            return new ApiResponse<>(500, e.getMessage(), null);

      }
    }
    @PostMapping
    public ApiResponse<String> saveTourType(@RequestBody TourType tourType) {
        try{
            tourTypeService.saveTourType(tourType);
            return new ApiResponse<>(200, "Save tour type success", null);
        }
        catch (Exception e) {
            return new ApiResponse<>(500, e.getMessage(), null);
        }
    }
}
