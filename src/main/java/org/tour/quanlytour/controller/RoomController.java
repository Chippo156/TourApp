package org.tour.quanlytour.controller;


import com.cloudinary.Api;
import lombok.RequiredArgsConstructor;
import org.tour.quanlytour.dtos.request.DestinationImageRequest;
import org.tour.quanlytour.dtos.request.RoomImageRequest;
import org.tour.quanlytour.dtos.request.RoomRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.RoomResponse;
import org.tour.quanlytour.entites.Destination;
import org.tour.quanlytour.entites.DestinationImage;
import org.tour.quanlytour.entites.Room;
import org.tour.quanlytour.entites.RoomImage;
import org.tour.quanlytour.services.impl.CloudinaryService;
import org.tour.quanlytour.services.service.RoomImageService;
import org.tour.quanlytour.services.service.RoomService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/rooms")
public class RoomController {
    private final RoomService roomService;
    private final RoomImageService roomImageService;
    private final CloudinaryService cloudinaryService;
    private final Logger logger = Logger.getLogger(RoomController.class.getName());


    @GetMapping
    public ApiResponse<List<RoomResponse>> getListOfRooms() {
        try {
            return new ApiResponse<>(200, "success", roomService.getAllRooms());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @PostMapping
    public ApiResponse<RoomResponse> createRoom(@RequestBody RoomRequest roomRequest) {
        try {
            return new ApiResponse<>(200, "success", roomService.saveRoom(roomRequest));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/{id}")
    public ApiResponse<RoomResponse> getRoom(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomService.getRoomById(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @PutMapping("/{id}")
    public ApiResponse<RoomResponse> updateRoom(@PathVariable Long id, @RequestBody RoomRequest roomRequest) {
        try {
            return new ApiResponse<>(200, "success", roomService.updateRoom(id, roomRequest));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            return new ApiResponse<>(200, "success", "Room deleted successfully");
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @PostMapping(value = "/uploadImages/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<RoomResponse> uploadImage(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        try {
            if (id == null || files == null || files.isEmpty()) {
                throw new IllegalArgumentException("Invalid input parameters");
            }
            RoomResponse roomResponse = roomService.getRoomById(id);

            List<String> urls = cloudinaryService.upload(files);
            for (String url : urls) {
                System.out.println(url);
                RoomImage roomImage = roomImageService.uploadImage(id,
                        RoomImageRequest.builder().imageUrl(url).build());

                if(roomResponse.getImageUrl().isEmpty()){
                    roomService.updateImage(id, url);
                }
            }
            return new ApiResponse<>(200, "success", roomResponse);

        } catch (IllegalArgumentException e) {
            logger.severe("Invalid input parameters");
            return new ApiResponse<>(400, e.getMessage(), null);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return new ApiResponse<>(500, e.getMessage(), null);
        }
    }
    @GetMapping("/destination/{id}")
    public ApiResponse<List<RoomResponse>> getRoomsByDestination(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomService.getRoomsByDestinationId(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/roomFirst/{id}")
    public ApiResponse<RoomResponse> getRoomFirst(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomService.findDistinctFirstByDestinationId(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/destination/{id}/notBooked")
    public ApiResponse<List<RoomResponse>> getRoomsNotBooked(@PathVariable Long id,
                                                             @RequestParam String startDate,
                                                             @RequestParam String endDate) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            return new ApiResponse<>(200, "success", roomService.filterRoomsIsNotBooked(id, start, end));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/available")
    public ApiResponse<List<RoomResponse>> getAvailableRooms(@RequestParam(required = false) Integer sleeps,
                                                             @RequestParam(required = false) String startDate,
                                                             @RequestParam(required = false) String endDate,
                                                             @RequestParam(required = false) Integer quantity,
                                                             @RequestParam(required = false) Long destinationId){
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
            return new ApiResponse<>(200, "success", roomService.findAvailableRooms(destinationId,sleeps, start, end, quantity));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/fakeData")
    public ApiResponse<String> fakeData(){
        try {
            return new ApiResponse<>(200, "success", roomService.fakeData());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
}
