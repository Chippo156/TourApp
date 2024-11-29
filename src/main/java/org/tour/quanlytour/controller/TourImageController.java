package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.tour.quanlytour.dtos.request.TourImageRequest;
import org.tour.quanlytour.dtos.request.TourRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.entites.Tour;
import org.tour.quanlytour.entites.TourImage;
import org.tour.quanlytour.services.impl.CloudinaryService;
import org.tour.quanlytour.services.service.TourImageService;
import org.tour.quanlytour.services.service.TourService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/tour-images")
public class TourImageController {
    private final TourImageService tourImageService;
    private final CloudinaryService cloudinaryService;
    private final TourService tourService;

    @GetMapping(value = "/tour/{tourId}")
    public ApiResponse<List<TourImage>> getTourImages(@PathVariable Long tourId) {
        try {
            return new ApiResponse<>(200, "success", tourImageService.get(tourId));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @PostMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<TourImage> uploadImage(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        try {
            if (id == null || files == null || files.isEmpty()) {
                return new ApiResponse<>(400, "Tour id or files is null", null);
            }
            Tour tour = tourService.getTourById(id);
            TourImage tourImage = new TourImage();
            List<String> urls = cloudinaryService.upload(files);
            for (String url : urls) {
              tourImage =   tourImageService.uploadImage(id, TourImageRequest.builder().imageUrl(url).build());
                if (tour.getImageUrl() == null) {
                    tourService.updateTourImage(tour.getId(), url);
                }
            }
            return new ApiResponse<>(200, "success", tourImage);
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

}
