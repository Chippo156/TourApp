package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.PopularAmenityRequest;
import org.tour.quanlytour.dtos.response.PopularAmenityResponse;

import java.util.List;

public interface PopularAmenityService {
    PopularAmenityResponse createPopularAmenity(PopularAmenityRequest popularAmenityRequest);
    PopularAmenityResponse getPopularAmenity(Long id);
    List<PopularAmenityResponse> getAllPopularAmenities();
}
