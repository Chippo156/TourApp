package org.tour.quanlytour.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourResponse {
    Long id;
    String name;
    String description;
    String highlight;
    String schedule;
    String duration;
    String departure;
    double price;
    double rating;
    @JsonProperty("image_url")
    String imageUrl;
    @JsonProperty("tour_type_id")
    Long tourTypeId;
}
