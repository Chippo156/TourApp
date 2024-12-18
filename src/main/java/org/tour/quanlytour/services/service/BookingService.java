package org.tour.quanlytour.services.service;

import org.springframework.data.domain.Page;
import org.tour.quanlytour.dtos.request.BookingRequest;
import org.tour.quanlytour.dtos.response.BookingResponse;
import org.tour.quanlytour.entites.Bookings;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest bookingRequest) throws Exception;

    Bookings getBooking(Long id);

    BookingResponse updateBooking(Long id, BookingRequest bookingRequest);

    boolean deleteBooking(Long id);
    boolean deleteBookingTour(Long id);

    List<BookingResponse> getAllBookings();

    List<BookingResponse> getBookingsByUserId(Long userId);

    BookingResponse createBookingTour(BookingRequest bookingRequest) throws Exception;


    Page<Bookings> findByDestinationIsNotEmptyAndRoomNotEmpty(int page, int size);
    Page<Bookings> findByTourNotEmpty(int page, int size);
    Page<Bookings> findByBookingCancel(Long userId, int page, int size);

    Page<Bookings> findByUserDestinationIsNotEmpty(Long userId, int page, int size);
    Page<Bookings> findByUserTourIsNotEmpty(Long userId, int page, int size);



}
