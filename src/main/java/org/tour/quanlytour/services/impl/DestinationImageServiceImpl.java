package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.DestinationImageRequest;
import org.tour.quanlytour.entites.Destination;
import org.tour.quanlytour.entites.DestinationImage;
import org.tour.quanlytour.repository.DestinationImageRepository;
import org.tour.quanlytour.repository.DestinationRepository;
import org.tour.quanlytour.services.service.DestinationImageService;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationImageServiceImpl implements DestinationImageService {
    private final DestinationRepository destinationRepository;
    private final DestinationImageRepository destinationImageRepository;

    @Override
    public DestinationImage uploadImage(Long destinationId, DestinationImageRequest request) {
        Destination destination = destinationRepository.findById(destinationId).orElseThrow(()->new RuntimeException("Destination not found"));
        DestinationImage destinationImage = new DestinationImage();
        destinationImage.setDestination(destination);
        destinationImage.setImageUrl(request.getImageUrl());
        int size = destinationImageRepository.findAllByDestinationId(destinationId).size();
        if (size >= 7) {
            throw new RuntimeException("You can't upload more than 7 images");
        } else {
            return destinationImageRepository.save(destinationImage);
        }
    }

    @Override
    public List<DestinationImage> get(Long destinationId) {
        try{
            return destinationImageRepository.findAllByDestinationId(destinationId);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String fakeData() {
        Faker faker = new Faker();
        for (int i = 16; i < 28; i++) {
            // Tìm Destination một lần cho mỗi i
            Destination destination = destinationRepository.findById((long) i)
                    .orElseThrow(() -> new RuntimeException("Destination not found"));

            for (int j = 0; j < 7; j++) {
                DestinationImage destinationImage = new DestinationImage();
                destinationImage.setImageUrl(faker.internet().image());
                destinationImage.setDestination(destination);
                destinationImageRepository.save(destinationImage);
            }
        }
        return "Fake data created successfully";
    }
}
