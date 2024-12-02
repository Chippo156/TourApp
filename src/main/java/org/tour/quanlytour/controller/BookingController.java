package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.tour.quanlytour.dtos.request.BookingRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.BookingResponse;
import org.tour.quanlytour.dtos.response.ListBookingResponse;
import org.tour.quanlytour.entites.Bookings;
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
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ApiResponse<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest){
        try{
            return new ApiResponse<>(200, "success", bookingService.createBooking(bookingRequest));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/tour")
    public ApiResponse<BookingResponse> createBookingTour(@RequestBody BookingRequest bookingRequest){
        try{
            return new ApiResponse<>(200, "success", bookingService.createBookingTour(bookingRequest));
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
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<BookingResponse> updateBooking(@PathVariable Long id, @RequestBody BookingRequest bookingRequest){
        try{
            return new ApiResponse<>(200, "success", bookingService.updateBooking(id, bookingRequest));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{id}")
    public ApiResponse<Boolean> deleteBooking(@PathVariable Long id){
        try{
            return new ApiResponse<>(200, "success", bookingService.deleteBooking(id));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    public ApiResponse<List<BookingResponse>> getBookingsByUserId(@PathVariable Long userId){
        try{
            return new ApiResponse<>(200, "success", bookingService.getBookingsByUserId(userId));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/bookingDestination")
    public ApiResponse<ListBookingResponse> getBookingDestination(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        try{
            Page<Bookings> bookings = bookingService.findByDestinationIsNotEmptyAndRoomNotEmpty(page-1, size);
            List<BookingResponse> bookingResponses = bookings.getContent().stream().map(bookingMapper::toBookingResponse).toList();
            return new ApiResponse<>(200, "success", new ListBookingResponse(bookingResponses, bookings.getTotalPages(), bookings.getNumberOfElements()));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/bookingTour")
    public ApiResponse<ListBookingResponse> getBookingTour(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        try{
            Page<Bookings> bookings = bookingService.findByTourNotEmpty(page-1, size);
            List<BookingResponse> bookingResponses = bookings.getContent().stream().map(bookingMapper::toBookingResponse).toList();
            return new ApiResponse<>(200, "success", new ListBookingResponse(bookingResponses, bookings.getTotalPages(), bookings.getNumberOfElements()));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/bookingCancel/{id}")
    public ApiResponse<ListBookingResponse> getBookingCancel(
            @PathVariable Long id,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        try{
            Page<Bookings> bookings = bookingService.findByBookingCancel(id, page-1, size);
            List<BookingResponse> bookingResponses = bookings.getContent().stream().map(bookingMapper::toBookingResponse).toList();
            return new ApiResponse<>(200, "success", new ListBookingResponse(bookingResponses, bookings.getTotalPages(), bookings.getNumberOfElements()));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/tour/{id}")
    public ApiResponse<Boolean> deleteBookingTour(@PathVariable Long id){
        try{
            return new ApiResponse<>(200, "success", bookingService.deleteBookingTour(id));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/userDestination/{id}")
    public ApiResponse<ListBookingResponse> getUserDestination(
            @PathVariable Long id,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        try{
            Page<Bookings> bookings = bookingService.findByUserDestinationIsNotEmpty(id, page-1, size);
            List<BookingResponse> bookingResponses = bookings.getContent().stream().map(bookingMapper::toBookingResponse).toList();
            return new ApiResponse<>(200, "success", new ListBookingResponse(bookingResponses, bookings.getTotalPages(), bookings.getNumberOfElements()));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/userTour/{id}")
    public ApiResponse<ListBookingResponse> getUserTour(
            @PathVariable Long id,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        try{
            Page<Bookings> bookings = bookingService.findByUserTourIsNotEmpty(id, page-1, size);
            List<BookingResponse> bookingResponses = bookings.getContent().stream().map(bookingMapper::toBookingResponse).toList();
            return new ApiResponse<>(200, "success", new ListBookingResponse(bookingResponses, bookings.getTotalPages(), bookings.getNumberOfElements()));
        }
        catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
}
