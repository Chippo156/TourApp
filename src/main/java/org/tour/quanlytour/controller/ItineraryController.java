package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.request.ItineraryRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.ItineraryResponse;
import org.tour.quanlytour.mapper.ItineraryMapper;
import org.tour.quanlytour.services.service.ItineraryService;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/itineraries")
@RequiredArgsConstructor
public class ItineraryController {
    private final ItineraryService itineraryService;
    private final ItineraryMapper itineraryMapper;

    @GetMapping("/tour/{id}")
    public ApiResponse<List<ItineraryResponse>> getListByTourId(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", itineraryService.getItineraryByTour(id).stream().map(itineraryMapper::toItineraryResponse).toList());
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PostMapping
    public ApiResponse<ItineraryResponse> createItinerary(@RequestBody ItineraryRequest request) {
        try {
            return new ApiResponse<>(200, "success", itineraryMapper.toItineraryResponse(itineraryService.createItinerary(request)));
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteItinerary(@PathVariable Long id) {
        try {
            itineraryService.deleteItinerary(id);
            return new ApiResponse<>(200, "success", null);
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PutMapping("/{id}")
    public ApiResponse<ItineraryResponse> updateItinerary(@PathVariable Long id, @RequestBody ItineraryRequest request) {
        try {
            return new ApiResponse<>(200, "success", itineraryMapper.toItineraryResponse(itineraryService.updateItinerary(id, request)));
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
}
