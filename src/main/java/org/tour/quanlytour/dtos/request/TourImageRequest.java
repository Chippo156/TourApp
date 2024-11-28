package org.tour.quanlytour.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourImageRequest {
    @JsonProperty("tour_id")
    Long tourId;
    @JsonProperty("image_url")
    String imageUrl;
}

