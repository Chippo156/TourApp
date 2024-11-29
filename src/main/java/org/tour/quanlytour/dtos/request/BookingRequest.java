package org.tour.quanlytour.dtos.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
public class BookingRequest {
    @JsonProperty("user_id")
    Long userId;
    @JsonProperty("destination_id")
    Long destinationId;
    @JsonProperty("room_id")
    Long roomId;
    @JsonProperty("tour_id")
    Long tourId;
    @JsonProperty("check_in_date")
    LocalDate checkInDate;
    @JsonProperty("check_out_date")
    LocalDate checkOutDate;
    @JsonProperty("payment_status")
    String paymentStatus;
    @JsonProperty("payment_method")
    String paymentMethod;
    @JsonProperty("payment_date")
    LocalDate paymentDate;
    @JsonProperty("quantity")
    int quantity;
    double amount;
    @JsonProperty("full_name")
    String fullName;
    String email;
    String phone;
}
