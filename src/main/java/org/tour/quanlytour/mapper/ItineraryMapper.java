package org.tour.quanlytour.mapper;

import org.mapstruct.Mapper;
import org.tour.quanlytour.dtos.request.ItineraryRequest;
import org.tour.quanlytour.dtos.response.ItineraryResponse;
import org.tour.quanlytour.entites.Itinerary;

@Mapper(componentModel = "spring")
public interface ItineraryMapper {
    Itinerary toItinerary(ItineraryRequest itinerary);

    ItineraryResponse toItineraryResponse(Itinerary itinerary);

}
