package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.ReviewRequest;
import org.tour.quanlytour.dtos.response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    List<ReviewResponse> getAllReviews();
    List<ReviewResponse> getReviewsByDestinationId(Long destinationId);

    boolean saveReview(ReviewRequest request);
    int countAllByDestinationId(Long destinationId);
    String fakeData();
}
