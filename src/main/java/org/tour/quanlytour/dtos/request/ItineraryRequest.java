package org.tour.quanlytour.dtos.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Builder
public class ItineraryRequest {
    String day;
    String activities;
    String time;
    Long tour_id;
}
