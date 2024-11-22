package org.tour.quanlytour.controller;
import lombok.RequiredArgsConstructor;
import org.tour.quanlytour.dtos.request.DestinationAmenityRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.entites.DestinationAmenity;
import org.tour.quanlytour.entites.PopularAmenity;
import org.tour.quanlytour.services.service.DestinationAmenityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/destination-amenity")
@RequiredArgsConstructor
public class DestinationAmenityController {

    private final DestinationAmenityService destinationAmenityService;

    @PostMapping
    public ApiResponse<String> saveDestinationAmenity(@RequestBody DestinationAmenityRequest request) {

        try{
            destinationAmenityService.saveDestinationAmenity(request);
            return new ApiResponse<>(200,"Destination Amenity saved successfully",null);

        }catch (Exception e ){
            return new ApiResponse<>(500,e.getMessage(),null);
        }
    }
    @GetMapping("destination/{id}")
    public ApiResponse<List<PopularAmenity>> getDestinationAmenity(@PathVariable Long id) {
        try{
            List<DestinationAmenity> destinationAmenity= destinationAmenityService.getDestinationAmenities(id);
            List<PopularAmenity> amenities = destinationAmenity.stream().map(DestinationAmenity::getAmenity).toList();
            return new ApiResponse<>(200,"Destination Amenities fetched successfully",amenities);

        }catch (Exception e ){
            return new ApiResponse<>(500,e.getMessage(),null);
        }
    }

    @GetMapping("/fake")
    public ApiResponse<String> fakeData() {
        try{
            destinationAmenityService.fakeData();
            return new ApiResponse<>(200,"Fake data created successfully",null);
        }catch (Exception e){
            return new ApiResponse<>(500,e.getMessage(),null);
        }
    }






}
