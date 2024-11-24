package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.entites.DestinationImage;
import org.tour.quanlytour.services.service.DestinationImageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/destination-images")
public class DestinationImagesController {
    private final DestinationImageService destinationImageService;
    @GetMapping("/destination/{id}")
    public ApiResponse<List<DestinationImage>> getDestinationImages(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", destinationImageService.get(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/fake")
    public ApiResponse<String> fakeData() {
        try {
            return new ApiResponse<>(200, "success", destinationImageService.fakeData());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
}
