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
@Builder
public class DestinationImageRequest {
    @JsonProperty("destination_id")
    Long destinationId;
    @JsonProperty("image_url")
    String imageUrl;
}