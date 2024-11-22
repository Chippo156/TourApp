package org.tour.quanlytour.services.service;


import org.tour.quanlytour.dtos.request.DestinationAmenityRequest;
import org.tour.quanlytour.entites.DestinationAmenity;

import java.util.List;

public interface DestinationAmenityService {
    DestinationAmenity saveDestinationAmenity(DestinationAmenityRequest request);
    DestinationAmenity getDestinationAmenity(Long destinationId, Long amenityId);
    List<DestinationAmenity> getDestinationAmenities(Long destinationId);
    String fakeData();
}
