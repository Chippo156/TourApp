package org.tour.quanlytour.services.impl;
import lombok.RequiredArgsConstructor;
import  org.tour.quanlytour.dtos.request.DestinationRequest;
import  org.tour.quanlytour.entites.Category;
import  org.tour.quanlytour.entites.Destination;
import  org.tour.quanlytour.mapper.DestinationMapper;
import  org.tour.quanlytour.repository.CategoryRepository;
import  org.tour.quanlytour.repository.DestinationRepository;
import  org.tour.quanlytour.services.service.DestinationService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationServiceImpl implements DestinationService {
    private final DestinationRepository destinationRepository;
    private final DestinationMapper mapper;
    private final CategoryRepository categoryRepository;
    @Override
    public Destination createDestination(DestinationRequest destinationRequest) throws Exception {
        try {
            Category category = categoryRepository.findById(destinationRequest.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Destination destination = mapper.toDestination(destinationRequest);
            destination.setCategory(category);
            return destinationRepository.save(destination);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Destination getDestination(Long id) {
        return destinationRepository.findById(id).orElseThrow(() -> new RuntimeException("Destination not found"));
    }

    @Override
    public void updateDestination(Long id, DestinationRequest destinationRequest) {
        try{
            Destination destination = destinationRepository.findById(id).orElseThrow(()->new RuntimeException("Destination not found"));
            System.out.println(destination);
            Category category = categoryRepository.findById(destinationRequest.getCategoryId())
                    .orElseThrow(()->new RuntimeException("Category not found"));

            if(destinationRequest.getName()!=null )
                destination.setName(destinationRequest.getName());
            if(destinationRequest.getDescription()!=null)
                destination.setDescription(destinationRequest.getDescription());
            if(destinationRequest.getAverageRating()!=0)
                destination.setAverageRating(destinationRequest.getAverageRating());
            if(destinationRequest.getLocation()!=null)
                destination.setLocation(destinationRequest.getLocation());
            if(destinationRequest.getCategoryId()!=0)
                destination.setCategory(category);
            if(destinationRequest.getImageUrl()!=null)
                destination.setImageUrl(destinationRequest.getImageUrl());



            destinationRepository.save(destination);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }


    @Override
    public List<Destination> getAllDestinations(int page, int size) {
        try{
            Sort sort = Sort.by(Sort.Order.asc("id"));
            Pageable pageable = PageRequest.of(page-1,size,sort);
            var destinations = destinationRepository.findAll(pageable);
            return destinations.getContent();
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteDestination(Long id) {
        try{
            destinationRepository.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("Destination not found");
        }
    }

    @Override
    public List<Destination> getDestinationByCategory(Long categoryId) {
        try{
            return destinationRepository.findByCategoryId(categoryId);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void updateImage(Long id, String imageUrl) {
        try{
            Destination destination = destinationRepository.findById(id).orElseThrow(()->new RuntimeException("Destination not found"));
            destination.setImageUrl(imageUrl);
            destinationRepository.save(destination);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public List<Destination> filterDestination(String search,String location, Long categoryId, Double averageRating,Double price, List<Long> amenityIds, Integer sleeps, LocalDate startDate, LocalDate endDate) {
        try{
            return destinationRepository.filterDestination(categoryId,averageRating,price,amenityIds,location,sleeps,startDate,endDate,search);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Destination> getDestinationByLocation(String location) {
        try {
            return destinationRepository.findByLocationContaining(location);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Destination> findAvailableDestinations(String startDate, String endDate) {
        try{
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            return destinationRepository.findAvailableDestinations(start,end);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Destination> searchDestination(String search) {

        try{
            return destinationRepository.searchDestination(search);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }


}
