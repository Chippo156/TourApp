package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.entites.RoomImage;
import org.tour.quanlytour.services.service.RoomImageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/room-images")
public class RoomImageController {
    private final RoomImageService roomImageService;

    @GetMapping("/room/{id}")
    public ApiResponse<List<RoomImage>> getRoomImages(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomImageService.get(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @GetMapping("/fake")
    public ApiResponse<String> fakeData() {
        try {
            return new ApiResponse<>(200, "success", roomImageService.fakeData());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
}

