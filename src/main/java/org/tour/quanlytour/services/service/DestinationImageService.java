package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.DestinationImageRequest;
import org.tour.quanlytour.entites.DestinationImage;
import java.util.List;

public interface DestinationImageService {
    DestinationImage uploadImage(Long destinationId, DestinationImageRequest request);
    List<DestinationImage> get(Long destinationId);
    String fakeData();
}
