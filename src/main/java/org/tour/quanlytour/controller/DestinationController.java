
package org.tour.quanlytour.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.tour.quanlytour.dtos.request.DestinationImageRequest;
import org.tour.quanlytour.dtos.request.DestinationRequest;
import org.tour.quanlytour.dtos.response.ListDestinationResponse;
import org.tour.quanlytour.entites.Destination;
import org.tour.quanlytour.entites.DestinationImage;
import org.tour.quanlytour.mapper.DestinationMapper;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.DestinationResponse;
import org.tour.quanlytour.services.impl.CloudinaryService;
import org.tour.quanlytour.services.service.DestinationImageService;
import org.tour.quanlytour.services.service.DestinationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
        import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("${api.prefix}/destinations")
@RequiredArgsConstructor
@Slf4j
public class DestinationController {
    private final DestinationService destinationService;
    private final DestinationMapper mapper;
    private final DestinationImageService destinationImageService;
    private final CloudinaryService cloudinaryService;
    private final Logger logger = Logger.getLogger(DestinationController.class.getName());
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<DestinationResponse> createDestination(@RequestBody DestinationRequest destinationRequest) {
        try {
            return new ApiResponse<>(200, "success",
                    mapper.toDestinationResponse(
                            destinationService.createDestination(destinationRequest))
            );
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }

    }

    @GetMapping
    public ApiResponse<ListDestinationResponse> getListDestination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {

            Page<Destination> destinations = destinationService.getAllDestinations(page-1, size);
            return new ApiResponse<>(200, "success",
                    ListDestinationResponse.builder()
                            .destinations(destinations.stream().map(mapper::toDestinationResponse).toList())
                            .totalPage(destinations.getTotalPages())
                            .totalElement(destinations.getNumberOfElements())
                            .build()
            );

        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<DestinationResponse> getDestination(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success",
                    mapper.toDestinationResponse(destinationService.getDestination(id)));
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/uploadImages/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<DestinationResponse> uploadImage(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        try {
            System.out.println(files);
            if (id == null || files == null || files.isEmpty()) {
                throw new IllegalArgumentException("Invalid input parameters");
            }
            Destination destination = destinationService.getDestination(id);
            List<String> urls = cloudinaryService.upload(files);
            for (String url : urls) {
                System.out.println(url);
                DestinationImage destinationImage = destinationImageService.uploadImage(destination.getId(),
                        DestinationImageRequest.builder()
                                .imageUrl(url)
                                .build()
                );
                if (destination.getImageUrl().isEmpty()) {
                    destinationService.updateImage(destination.getId(), url);
                }
            }
            return new ApiResponse<>(200, "success",
                    mapper.toDestinationResponse(destination));

        } catch (IllegalArgumentException e) {
            logger.severe("Invalid input parameters");
            return new ApiResponse<>(400, e.getMessage(), null);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return new ApiResponse<>(500, e.getMessage(), null);
        }
    }


    @GetMapping("/filter")
    public ApiResponse<ListDestinationResponse> filterDestination(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Double averageRating,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) List<Long> amenityIds,
            @RequestParam(required = false) Integer sleeps,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            String locationParam = location != null ? StringUtils.stripAccents(location.toLowerCase().replaceAll("[\\s,]", "")) : null;
            String searchParam = search != null ? StringUtils.stripAccents(search.toLowerCase().replaceAll("[\\s,]", "")) : null;
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
            Page<Destination> destinations = destinationService.filterDestination(searchParam,locationParam, categoryId, averageRating, price, amenityIds, sleeps, start, end, page-1, size);
            List<DestinationResponse> destinationResponses = destinations.stream().map(mapper::toDestinationResponse).toList();
            return new ApiResponse<>(200, "success", new ListDestinationResponse(destinationResponses, destinations.getTotalPages(), destinations.getNumberOfElements()));
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/location")
    public ApiResponse<List<DestinationResponse>> getLocation(@RequestParam(required = false) String location){
        try {
            return new ApiResponse<>(200, "success",
                    destinationService.getDestinationByLocation(location).stream().map(mapper::toDestinationResponse).toList());
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/available")
    public ApiResponse<List<DestinationResponse>> getAvailableDestinations(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        try {
            return new ApiResponse<>(200, "success",
                    destinationService.findAvailableDestinations(startDate, endDate).stream().map(mapper::toDestinationResponse).toList());
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/search")
    public ApiResponse<List<DestinationResponse>> searchDestination(
            @RequestParam(required = false) String search
    ) {
        try {
            return new ApiResponse<>(200, "success",
                    destinationService.searchDestination(search).stream().map(mapper::toDestinationResponse).toList());
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ApiResponse<DestinationResponse> updateDestination(@PathVariable Long id, @RequestBody DestinationRequest request) {
        try {
            return new ApiResponse<>(200, "success",
                  destinationService.updateDestination(id, request));
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteDestination(@PathVariable Long id) {
        try {
            destinationService.deleteDestination(id);
            return new ApiResponse<>(200, "success", null);
        } catch (Exception e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }

}
