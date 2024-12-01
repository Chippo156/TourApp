package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.request.UserRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.ListUserResponse;
import org.tour.quanlytour.dtos.response.UserResponse;
import org.tour.quanlytour.entites.User;
import org.tour.quanlytour.mapper.UserMapper;
import org.tour.quanlytour.services.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/users")
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping("/registration")
    public ApiResponse<UserResponse> createUser(@RequestBody UserRequest userRequest){
        try{
            return new ApiResponse<>(200,"success",mapper.toUserResponse(userService.createUser(userRequest)));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest){
        try{
            return new ApiResponse<>(200,"success",mapper.toUserResponse(userService.updateUser(id,userRequest)));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<ListUserResponse> getUser(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        try{
            Page<User> users = userService.getAllUser(page-1,size);
            List<UserResponse> userResponses = users.map(mapper::toUserResponse).getContent();
            return new ApiResponse<>(200,"success",new ListUserResponse(userResponses,users.getTotalPages(),users.getNumberOfElements()));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
}
