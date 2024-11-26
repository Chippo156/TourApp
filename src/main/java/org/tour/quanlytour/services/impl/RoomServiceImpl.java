package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.tour.quanlytour.dtos.request.RoomRequest;
import org.tour.quanlytour.dtos.response.RoomResponse;
import org.tour.quanlytour.entites.Destination;
import org.tour.quanlytour.entites.Room;
import org.tour.quanlytour.mapper.RoomMapper;
import org.tour.quanlytour.repository.DestinationRepository;
import org.tour.quanlytour.repository.RoomRepository;
import org.tour.quanlytour.services.service.RoomService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final DestinationRepository destinationRepository;

    @Override
    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream().map(roomMapper::toRoomResponse).toList();
    }

    @Override
    public RoomResponse getRoomById(Long id) {
        return roomRepository.findById(id).map(roomMapper::toRoomResponse).orElseThrow(() -> new RuntimeException("Room not found"));

    }

    @Override
    public RoomResponse saveRoom(RoomRequest roomRequest) {
        try {
            Destination destination = destinationRepository.findById(roomRequest.getDestinationId()).orElseThrow(() -> new RuntimeException("Destination not found"));
            Room room = roomMapper.toRoom(roomRequest);
            room.setDestination(destination);
            return roomMapper.toRoomResponse(roomRepository.save(room));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public RoomResponse updateRoom(Long id, RoomRequest roomRequest) {
        try {
            Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
            if (roomRequest.getRoomType() != null)
                room.setRoomType(roomRequest.getRoomType());
            if (roomRequest.getDescription() != null)
                room.setDescription(roomRequest.getDescription());
            if (roomRequest.getBeds() != null)
                room.setBeds(roomRequest.getBeds());
            if (roomRequest.getPrice() != 0)
                room.setPrice(roomRequest.getPrice());
            if (roomRequest.getSleeps() != 0)
                room.setSleeps(roomRequest.getSleeps());
            if (roomRequest.getQuantity() != 0)
                room.setQuantity(roomRequest.getQuantity());


            if (roomRequest.getFeatures() != null)
                room.setFeatures(roomRequest.getFeatures());
            return roomMapper.toRoomResponse(roomRepository.save(room));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteRoom(Long id) {
        try {
            roomRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public List<RoomResponse> getRoomsByDestinationId(Long destinationId) {
        return roomRepository.findByDestinationId(destinationId).stream().map(roomMapper::toRoomResponse).toList();
    }

    @Override
    public List<RoomResponse> getRoomsByRoomType(String roomType) {
        return roomRepository.findByRoomType(roomType).stream().map(roomMapper::toRoomResponse).toList();
    }

    @Override
    public void updateImage(Long id, String imageUrl) {
        try {
            Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
            room.setImageUrl(imageUrl);
            roomRepository.save(room);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public RoomResponse findDistinctFirstByDestinationId(Long destinationId) {
        try {
            return roomMapper.toRoomResponse(roomRepository.findDistinctFirstByDestinationId(destinationId));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<RoomResponse> filterRoomsIsNotBooked(Long destinationId, LocalDate startDate, LocalDate endDate) {
        return null;
    }

    @Override
    public List<RoomResponse> findAvailableRooms(Long destinationId, Integer sleeps, LocalDate startDate, LocalDate endDate, Integer quantity) {
        return roomRepository.findAvailableRooms(destinationId, sleeps, startDate, endDate, quantity).stream().map(roomMapper::toRoomResponse).toList();
    }

    @Override
    public String fakeData() {
        Faker faker = new Faker();
        String[] roomTypes = {"Villa", "Studio", "Hotel", "GrandSuite"};
        String[] imageUrls = {"http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073703/1ac4d387-0b34-459c-905b-102d8b99b03d.webp",
                "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073597/e9214ebb-4294-49ac-bd2b-455b6eb0d20d.avif",
                "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073529/bbba867c-2aee-44b8-b260-03d16d84899d.avif",
                "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073489/9c21787c-eeca-4b97-b73d-4d9b0248183a.avif"};
        String [] description = {"City View", "Mountain View", "Sea View", "Garden View"};
        for (int i = 0; i < 40; i++) {
            Room room = new Room();
            room.setRoomType(roomTypes[faker.random().nextInt(roomTypes.length)]);
            room.setDescription(description[faker.random().nextInt(description.length)]);
            room.setBeds(faker.number().numberBetween(1, 3) + " King Beds");
            room.setPrice(faker.number().numberBetween(5000000, 10000000));
            room.setSleeps(faker.number().numberBetween(1, 12));
            room.setQuantity(faker.number().numberBetween(1, 6));
            room.setFeatures("Free Wifi");
            room.setImageUrl(imageUrls[faker.random().nextInt(imageUrls.length)]);
            room.setArea((double) faker.number().numberBetween(100,200));
            room.setDestination(destinationRepository.findById((long) faker.number().numberBetween(13, 27)).orElseThrow(() -> new RuntimeException("Destination not found")));
            roomRepository.save(room);
        }
        return "Data created successfully";
    }
}
