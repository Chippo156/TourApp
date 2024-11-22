
package org.tour.quanlytour.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
        import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
public class DestinationAmenityRequest {
    @JsonProperty("destination_id")
    Long destinationId;
    @JsonProperty("amenity_id")
    Long amenityId;
}
