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
public class PopularAmenityRequest {
    @JsonProperty("amenity_name")
    private String amenityName;
    @JsonProperty("amenity_icon")
    private String amenityIcon;
}
