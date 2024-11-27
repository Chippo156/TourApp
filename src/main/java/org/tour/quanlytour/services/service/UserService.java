package org.tour.quanlytour.services.service;

import org.tour.quanlytour.dtos.request.UserRequest;
import org.tour.quanlytour.entites.User;

import java.util.Optional;

public interface UserService {
    User createUser(UserRequest userRequest);
    Optional<User> getUser(Long id);
    User updateUser(UserRequest userRequest);
    void deleteUser(Long id);
    Optional<User> getUserByEmail(String email);
    User getUserByUsername(String username);
}