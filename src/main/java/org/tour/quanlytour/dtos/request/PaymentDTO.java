package org.tour.quanlytour.dtos.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaymentDTO {

    @Builder
    public static class VNPayResponse{
        public String code;
        public String message;
        public String paymentUrl;
    }
}
