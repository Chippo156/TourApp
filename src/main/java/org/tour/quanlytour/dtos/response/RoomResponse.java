package org.tour.quanlytour.dtos.response;

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

public class RoomResponse {
    Long id;
    @JsonProperty("room_type")
    String roomType; // Loại phòng, ví dụ: Villa, Suite, Standard Room
    String description; // Mô tả về phòng (ví dụ: Private Pool, Lake View)
    String features; // Các tiện ích: Free WiFi, Free self-parking, Spa discount, etc.
    Integer sleeps; // Số người có thể ở
    Double area; // Diện tích (m²)
    String beds; // Loại và số lượng giường (e.g., 1 King Bed, 1 Double Sofa Bed)
    double price;
    int quantity;
    @JsonProperty("image_url")
    String imageUrl;
    @JsonProperty("destination_id")
    Long destinationId;
}
