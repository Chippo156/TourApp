package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.request.ReviewRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.services.service.ReviewService;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<String> createReview(@RequestBody ReviewRequest reviewRequest) {
        try{
            reviewService.saveReview(reviewRequest);
            return new ApiResponse<>(200, "success", null);
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/destination/{destinationId}")
    public ApiResponse<?> getReviewsByDestinationId(@PathVariable Long destinationId){
        try{
            return new ApiResponse<>(200, "success", reviewService.getReviewsByDestinationId(destinationId));
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/fake")
    public ApiResponse<?> fakeData(){
        try{
            reviewService.fakeData();
            return new ApiResponse<>(200, "success", null);
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/count/{destinationId}")
    public ApiResponse<?> countAllByDestinationId(@PathVariable Long destinationId){
        try{
            return new ApiResponse<>(200, "success", reviewService.countAllByDestinationId(destinationId));
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
}

