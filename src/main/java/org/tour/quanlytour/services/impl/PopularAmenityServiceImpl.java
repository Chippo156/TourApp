package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.PopularAmenityRequest;
import org.tour.quanlytour.dtos.response.PopularAmenityResponse;
import org.tour.quanlytour.entites.PopularAmenity;
import org.tour.quanlytour.mapper.PopularAmenityMapper;
import org.tour.quanlytour.repository.PopularAmenityRepository;
import org.tour.quanlytour.services.service.PopularAmenityService;
import java.util.List;
@Service
@RequiredArgsConstructor
public class PopularAmenityServiceImpl implements PopularAmenityService {
    private final PopularAmenityRepository popularAmenityRepository;
    private final PopularAmenityMapper popularAmenityMapper;
    @Override
    public PopularAmenityResponse createPopularAmenity(PopularAmenityRequest popularAmenityRequest) {
        try{
            PopularAmenity popularAmenity = popularAmenityMapper.popularAmenityRequestToPopularAmenity(popularAmenityRequest);
            return popularAmenityMapper.popularAmenityToPopularAmenityResponse(popularAmenityRepository.save(popularAmenity));
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    @Override
    public PopularAmenityResponse getPopularAmenity(Long id) {
        return popularAmenityRepository.findById(id).map(popularAmenityMapper::popularAmenityToPopularAmenityResponse)
                .orElseThrow(()->new RuntimeException("Popular Amenity not found"));
    }
    @Override
    public List<PopularAmenityResponse> getAllPopularAmenities() {
        try{
            return popularAmenityRepository.findAll().stream().map(popularAmenityMapper::popularAmenityToPopularAmenityResponse).toList();
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
