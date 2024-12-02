package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.tour.quanlytour.dtos.request.BookingRequest;
import org.tour.quanlytour.dtos.response.BookingResponse;
import org.tour.quanlytour.entites.*;
import org.tour.quanlytour.mapper.BookingMapper;
import org.tour.quanlytour.repository.*;
import org.tour.quanlytour.services.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private  final DestinationRepository destinationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    @Override
    public BookingResponse createBooking(BookingRequest bookingRequest) throws Exception {
        try{
            User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(()->new RuntimeException("User not found"));
            Destination destination = destinationRepository.findById(bookingRequest.getDestinationId()).orElseThrow(()->new RuntimeException("Destination not found"));
            Room room = roomRepository.findById(bookingRequest.getRoomId()).orElseThrow(()->new RuntimeException("Room not found"));
            Bookings bookings = bookingMapper.toBooking(bookingRequest);
            bookings.setDestination(destination);
            bookings.setRoom(room);
            bookings.setUser(user);
            if(bookingRequest.getPaymentStatus().equals("NO_PAID")){
                bookings.setPaymentDate(null);
            }else if(bookingRequest.getPaymentStatus().equals("PAID")){
                bookings.setPaymentDate(LocalDate.now());
            }
            bookings.setBookingStatus("BOOKED");
            room.setQuantity(room.getQuantity()-bookingRequest.getQuantity());
            roomRepository.save(room);
            bookings.setQuantity(bookingRequest.getQuantity());
            bookings = bookingRepository.save(bookings);
            return bookingMapper.toBookingResponse(bookings);
        }catch (Exception ex){
            throw new Exception(ex.getMessage());
        }
    }


    @Override
    public Bookings getBooking(Long id) {
        return bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest bookingRequest) {
        try{
            Bookings bookings = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));

            if(bookingRequest.getCheckInDate()!=null){
                bookings.setCheckInDate(bookingRequest.getCheckInDate());
            }
            if(bookingRequest.getCheckOutDate()!=null){
                bookings.setCheckOutDate(bookingRequest.getCheckOutDate());
            }
            if(bookingRequest.getPaymentMethod()!=null){
                bookings.setPaymentMethod(bookingRequest.getPaymentMethod());
            }
            if(bookingRequest.getAmount()!=0){
                bookings.setAmount(bookingRequest.getAmount());
            }
            if(bookingRequest.getPaymentStatus().equals("NO_PAID")){
                bookings.setPaymentDate(null);
            }else if(bookingRequest.getPaymentStatus().equals("PAID")){
                bookings.setPaymentDate(LocalDate.now());
            }
            bookings = bookingRepository.save(bookings);
            return bookingMapper.toBookingResponse(bookings);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean deleteBooking(Long id) {
        try{
            Bookings bookings = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
            bookings.setBookingStatus("CANCELLED");
            Room room = roomRepository.findById(bookings.getRoom().getId()).orElseThrow(()->new RuntimeException("Room not found"));
            room.setQuantity(room.getQuantity()+bookings.getQuantity());
            roomRepository.save(room);
            bookingRepository.save(bookings);
            return true;
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean deleteBookingTour(Long id) {
        try{
            Bookings bookings = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
            Tour tour = tourRepository.findById(bookings.getTour().getId()).orElseThrow(()->new RuntimeException("Tour not found"));
            bookings.setBookingStatus("CANCELLED");
            bookingRepository.save(bookings);
            return true;
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(bookingMapper::toBookingResponse).toList();
    }

    @Override
    public List<BookingResponse> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream().map(bookingMapper::toBookingResponse).toList();
    }

    @Override
    public BookingResponse createBookingTour(BookingRequest bookingRequest) throws Exception {
        try{
            Tour tour = tourRepository.findById(bookingRequest.getTourId()).orElseThrow(()->new RuntimeException("Tour not found"));
            User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(()->new RuntimeException("User not found"));

            Bookings bookings = bookingMapper.toBooking(bookingRequest);
            bookings.setTour(tour);
            bookings.setUser(user);
            if(bookingRequest.getPaymentStatus().equals("NO_PAID")){
                bookings.setPaymentDate(null);
            }else if(bookingRequest.getPaymentStatus().equals("PAID")){
                bookings.setPaymentDate(LocalDate.now());
            }
            bookings.setBookingStatus("BOOKED");
            bookings.setQuantity(bookingRequest.getQuantity());
            bookings = bookingRepository.save(bookings);
            return bookingMapper.toBookingResponse(bookings);
        }catch (Exception ex){
            throw new Exception(ex.getMessage());
        }
    }

    @Override
    public Page<Bookings> findByDestinationIsNotEmptyAndRoomNotEmpty(int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return bookingRepository.findByDestinationIsNotEmpty(pageable);
    }

    @Override
    public Page<Bookings> findByTourNotEmpty(int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return bookingRepository.findByTourIsNotEmpty(pageable);
    }

    @Override
    public Page<Bookings> findByBookingCancel(Long userId, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return bookingRepository.findByBookingCancel(userId, pageable);
    }

    @Override
    public Page<Bookings> findByUserDestinationIsNotEmpty(Long userId, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return bookingRepository.findByUserDestinationIsNotEmpty(userId, pageable);
    }

    @Override
    public Page<Bookings> findByUserTourIsNotEmpty(Long userId, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return bookingRepository.findByUserTourIsNotEmpty(userId, pageable);
    }
}
