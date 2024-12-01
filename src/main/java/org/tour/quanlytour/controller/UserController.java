package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.request.UserRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.UserResponse;
import org.tour.quanlytour.mapper.UserMapper;
import org.tour.quanlytour.services.service.UserService;

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
    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest){
        try{
            return new ApiResponse<>(200,"success",mapper.toUserResponse(userService.updateUser(id,userRequest)));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }

}
