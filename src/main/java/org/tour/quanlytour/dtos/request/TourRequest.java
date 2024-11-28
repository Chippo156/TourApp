package org.tour.quanlytour.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.tour.quanlytour.entites.Itinerary;

import java.time.LocalDate;
import java.util.List;
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourRequest {
    String name;
    String description;
    String highlight;
    @JsonProperty("start_date")
    LocalDate startDate;
    @JsonProperty("end_date")
    LocalDate endDate;
    String duration;
    String departure;
    double price;
    @JsonProperty("max_people")
    int maxPeople;
    double rating;

}
