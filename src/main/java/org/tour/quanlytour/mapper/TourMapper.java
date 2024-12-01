package org.tour.quanlytour.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.tour.quanlytour.dtos.request.TourRequest;
import org.tour.quanlytour.dtos.response.TourResponse;
import org.tour.quanlytour.entites.Tour;

@Mapper(componentModel = "spring")
public interface TourMapper {
    Tour toTour(TourRequest tourRequest);

    @Mapping(target = "tourTypeId", source = "tour.tourType.id")
    TourResponse toTourResponse(Tour tour);
}
