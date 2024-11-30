package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.BookingRequest;
import org.tour.quanlytour.dtos.response.BookingResponse;
import org.tour.quanlytour.entites.Bookings;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest bookingRequest) throws Exception;

    Bookings getBooking(Long id);

    BookingResponse updateBooking(Long id, BookingRequest bookingRequest);

    boolean deleteBooking(Long id);

    List<BookingResponse> getAllBookings();

    List<BookingResponse> getBookingsByUserId(Long userId);

    BookingResponse createBookingTour(BookingRequest bookingRequest) throws Exception;


}
