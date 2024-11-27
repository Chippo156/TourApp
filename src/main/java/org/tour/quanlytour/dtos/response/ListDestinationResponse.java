package org.tour.quanlytour.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Builder
public class ListDestinationResponse {
    List<DestinationResponse> destinations;
    int totalPage;
    int totalElement;
}
