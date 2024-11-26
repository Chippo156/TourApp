package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;

import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.ReviewRequest;
import org.tour.quanlytour.dtos.response.ReviewResponse;
import org.tour.quanlytour.entites.Destination;
import org.tour.quanlytour.entites.Review;
import org.tour.quanlytour.entites.User;
import org.tour.quanlytour.mapper.ReviewMapper;
import org.tour.quanlytour.repository.DestinationRepository;
import org.tour.quanlytour.repository.ReviewRepository;
import org.tour.quanlytour.repository.UserRepository;
import org.tour.quanlytour.services.service.ReviewService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository repository;
    private final ReviewMapper mapper;
    private final DestinationRepository destinationRepository;
    private final UserRepository userRepository;

    @Override
    public List<ReviewResponse> getAllReviews() {
        return null;
    }

    @Override
    public List<ReviewResponse> getReviewsByDestinationId(Long destinationId) {
        try {



            return repository.findAllByDestinationId(destinationId).stream().map(mapper::toReviewResponse).toList();
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching reviews by destination id");
        }
    }

    @Override
    public boolean saveReview(ReviewRequest request) {
        try {
            Destination destination = destinationRepository.findById(request.getDestinationId()).orElseThrow(() -> new RuntimeException("Destination not found"));
            User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
            Review review = mapper.toReview(request);
            review.setDestination(destination);
            review.setUser(user);
            repository.save(review);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error while saving review");
        }
    }

    @Override
    public int countAllByDestinationId(Long destinationId) {
        try {
            return repository.countAllByDestinationId(destinationId);
        } catch (Exception e) {
            throw new RuntimeException("Error while counting reviews by destination id");
        }
    }

    @Override
    public String fakeData() {
        Faker faker = new Faker();
        for (int i = 0; i < 40; i++) {
            try{
                String fakeTitle = faker.lorem().sentence();
                String fakeContent = faker.lorem().paragraph();
                int fakeRating = faker.number().numberBetween(1, 5);
                LocalDateTime fakeDateTime = faker.date().past(365, TimeUnit.DAYS).toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                Long fakeUserId = (long) faker.number().numberBetween(1, 1);
                Long fakeDestinationId;
                do {
                    fakeDestinationId = (long) faker.number().numberBetween(1, 10);
                } while (fakeDestinationId == 2 || fakeDestinationId == 3);

                String fakeImageUrl = faker.internet().image();

                Review fakeReview = new Review();
                fakeReview.setTitle(fakeTitle);
                fakeReview.setContent(fakeContent);
                fakeReview.setRating(fakeRating);
                fakeReview.setCreatedAt(fakeDateTime);
                fakeReview.setUpdatedAt(fakeDateTime);
                fakeReview.setImageUrl(fakeImageUrl);
                fakeReview.setDestination(destinationRepository.findById(fakeDestinationId).orElseThrow(() -> new RuntimeException("Destination not found")));
                fakeReview.setUser(userRepository.findById(fakeUserId).orElseThrow(() -> new RuntimeException("User not found")));
                repository.save(fakeReview);
            }catch (Exception e) {
                return "Error while creating fake review";
            }
        }
        return "Fake review created";
    }
}