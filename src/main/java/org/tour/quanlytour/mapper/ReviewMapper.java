package org.tour.quanlytour.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.tour.quanlytour.dtos.request.ReviewRequest;
import org.tour.quanlytour.dtos.response.ReviewResponse;
import org.tour.quanlytour.entites.Review;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toReview(ReviewRequest request);


    @Mapping(target = "username", expression = "java(review.getUser().getFirstName() + ' ' + review.getUser().getLastName())")
    ReviewResponse toReviewResponse(Review review);

}