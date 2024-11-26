package org.tour.quanlytour.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
public class ReviewResponse {
    @JsonProperty("title")
    private String title;
    private String content;
    private int rating;
    @JsonProperty("image_url")
    private String imageUrl;
    private String username;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
}
