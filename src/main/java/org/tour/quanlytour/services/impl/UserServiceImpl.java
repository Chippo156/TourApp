package org.tour.quanlytour.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.tour.quanlytour.dtos.request.UserRequest;
import org.tour.quanlytour.entites.Role;
import org.tour.quanlytour.entites.User;
import org.tour.quanlytour.mapper.UserMapper;
import org.tour.quanlytour.repository.RoleRepository;
import org.tour.quanlytour.repository.UserRepository;
import org.tour.quanlytour.services.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper mapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public User createUser(UserRequest userRequest) {
        if(userRepository.existsByUsername(userRequest.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        User user = mapper.toUser(userRequest);
        System.out.println(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<Role> getRoles = roleRepository.findAll();
        user.setRole(getRoles.get(1));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(UserRequest userRequest) {
        if(userRepository.existsByUsername(userRequest.getUsername())){
            User user = userRepository.findByUsername(userRequest.getUsername()).orElseThrow(()->new RuntimeException("User not found"));
            user.setUsername(userRequest.getUsername());
            user.setPhone(userRequest.getPhone());
            user.setEmail(userRequest.getEmail());
            user.setPassword(userRequest.getPassword());
            return userRepository.save(user);
        }else{
            throw new RuntimeException("User not found");
        }

    }
    @Override
    public void deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
        }
        catch (Exception e){
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
    }

}
