
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
public class DestinationRequest {

    String name;
    String description;
    String location;
    @JsonProperty("average_rating")
    double averageRating;
    @JsonProperty("category_id")
    Long categoryId;
    @JsonProperty("image_url")
    String imageUrl;
}
