package org.tour.quanlytour.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tour.quanlytour.dtos.request.BookingRequest;
import org.tour.quanlytour.entites.Bookings;
import org.tour.quanlytour.mapper.BookingMapper;
import org.tour.quanlytour.services.impl.PaymentService;
import org.tour.quanlytour.services.service.BookingService;

import java.io.IOException;

@RestController
@RequestMapping("${api.prefix}/payment")
@CrossOrigin(origins = "http://localhost:8081")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final BookingService bookingService;
    private final BookingMapper bookingMapper;
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.createVnPayPayment(request));
    }
    @GetMapping("/vnpay-callback")
    public ResponseEntity<?> payCallBackHandle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            Long bookingId = Long.parseLong(request.getParameter("vnp_OrderInfo"));
            Bookings booking = bookingService.getBooking(bookingId);
            booking.setPaymentStatus("PAID");
            BookingRequest requestBooking = bookingMapper.toBookingRequest(booking);
            bookingService.updateBooking(bookingId, requestBooking);
            response.sendRedirect("http://localhost:3000?paymentStatus=00");
            return ResponseEntity.ok(response.getStatus());
        }else{
            response.sendRedirect("http://localhost:3000?paymentStatus=01");
            return ResponseEntity.ok("Thanh toán thất bại");
        }
    }
}
