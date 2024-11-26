package org.tour.quanlytour.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
public class ReviewRequest {
    @JsonProperty("title")
    private String title;
    private String content;
    private int rating;
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("destination_id")
    private Long destinationId;
    @JsonProperty("user_id")
    private Long userId;
}
