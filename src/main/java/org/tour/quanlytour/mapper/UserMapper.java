package org.tour.quanlytour.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.tour.quanlytour.dtos.request.UserRequest;
import org.tour.quanlytour.dtos.response.UserResponse;
import org.tour.quanlytour.entites.User;
@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserRequest userRequest);
    @Mapping(target = "roleId", source = "user.role.id")
    UserResponse toUserResponse(User user);
}
