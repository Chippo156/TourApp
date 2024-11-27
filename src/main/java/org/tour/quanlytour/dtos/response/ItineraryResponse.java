package org.tour.quanlytour.dtos.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Builder
public class ItineraryResponse {
    String day;
    String activities;
    String time;
    Long tour_id;
}
