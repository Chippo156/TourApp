package org.tour.quanlytour.mapper;
import org.tour.quanlytour.dtos.request.DestinationRequest;
import org.tour.quanlytour.entites.Destination;
import org.tour.quanlytour.dtos.response.DestinationResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DestinationMapper {
    Destination toDestination(DestinationRequest destinationRequest);
    DestinationResponse toDestinationResponse(Destination destination);
}
