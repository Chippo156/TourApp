package org.tour.quanlytour.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomImageRequest {
    @JsonProperty("room_id")
    Long roomId;
    @JsonProperty("image_url")
    String imageUrl;
}

