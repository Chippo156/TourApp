package org.tour.quanlytour.mapper;

import org.tour.quanlytour.dtos.request.RoomRequest;
import org.tour.quanlytour.dtos.response.RoomResponse;
import org.tour.quanlytour.entites.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    Room toRoom(RoomRequest roomRequest);
    @Mapping(target = "destinationId", source = "room.destination.id")
    RoomResponse toRoomResponse(Room room);
}
