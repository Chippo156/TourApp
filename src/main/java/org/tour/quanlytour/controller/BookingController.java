package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.tour.quanlytour.dtos.request.BookingRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.BookingResponse;
import org.tour.quanlytour.mapper.BookingMapper;
import org.tour.quanlytour.services.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final BookingMapper bookingMapper;
    @GetMapping
    public ApiResponse<List<BookingResponse>> getAllBookings() {
        try{
            return new ApiResponse<>(200, "success", bookingService.getAllBookings());
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PostMapping
    public ApiResponse<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest){
        try{
            return new ApiResponse<>(200, "success", bookingService.createBooking(bookingRequest));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/{id}")
    public ApiResponse<BookingResponse> getBooking(@PathVariable Long id){
        try{
            return new ApiResponse<>(200, "success", bookingMapper.toBookingResponse(bookingService.getBooking(id)));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PutMapping("/{id}")
    public ApiResponse<BookingResponse> updateBooking(@PathVariable Long id, @RequestBody BookingRequest bookingRequest){
        try{
            return new ApiResponse<>(200, "success", bookingService.updateBooking(id, bookingRequest));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Boolean> deleteBooking(@PathVariable Long id){
        try{
            return new ApiResponse<>(200, "success", bookingService.deleteBooking(id));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/user/{userId}")
    public ApiResponse<List<BookingResponse>> getBookingsByUserId(@PathVariable Long userId){
        try{
            return new ApiResponse<>(200, "success", bookingService.getBookingsByUserId(userId));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }


}
