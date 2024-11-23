package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.request.PopularAmenityRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.PopularAmenityResponse;
import org.tour.quanlytour.services.service.PopularAmenityService;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/amenities")
@RequiredArgsConstructor
public class PopularAmenityController {
    private final PopularAmenityService popularAmenityService;

    @GetMapping
    public ApiResponse<List<PopularAmenityResponse>> getListOfPopularAmenities() {
        try {
            return new ApiResponse<>(200, "success", popularAmenityService.getAllPopularAmenities());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @PostMapping
    public ApiResponse<PopularAmenityResponse> createPopularAmenity(@RequestBody PopularAmenityRequest popularAmenityRequest) {
        try {
            return new ApiResponse<>(200, "success", popularAmenityService.createPopularAmenity(popularAmenityRequest));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<PopularAmenityResponse> getPopularAmenity(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", popularAmenityService.getPopularAmenity(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);

        }
    }
}
