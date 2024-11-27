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
    @JsonProperty("start_date")
    LocalDate startDate;
    @JsonProperty("end_date")
    LocalDate endDate;
    String duration;
    String departure;
    double price;
}
