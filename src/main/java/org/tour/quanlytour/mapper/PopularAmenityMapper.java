package org.tour.quanlytour.mapper;

import org.mapstruct.Mapper;
import org.tour.quanlytour.dtos.request.PopularAmenityRequest;
import org.tour.quanlytour.dtos.response.PopularAmenityResponse;
import org.tour.quanlytour.entites.PopularAmenity;
@Mapper(componentModel = "spring")
public interface PopularAmenityMapper {
    PopularAmenity popularAmenityRequestToPopularAmenity(PopularAmenityRequest popularAmenityRequest);
    PopularAmenityResponse popularAmenityToPopularAmenityResponse(PopularAmenity popularAmenity);

}
