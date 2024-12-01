package org.tour.quanlytour.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Builder
public class ListBookingResponse {
    List<BookingResponse> bookingResponses;
    int totalPage;
    int totalElement;
}
