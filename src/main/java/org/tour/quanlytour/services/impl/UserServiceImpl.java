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
    public User updateUser(Long id,UserRequest userRequest) {
        try{

            User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
            if(userRequest.getUsername()!=null){
                user.setUsername(userRequest.getUsername());
            }
            if(userRequest.getEmail()!=null){
                user.setEmail(userRequest.getEmail());
            }
            if(userRequest.getFirstName()!=null){
                user.setFirstName(userRequest.getFirstName());
            }
            if(userRequest.getLastName()!=null){
                user.setLastName(userRequest.getLastName());
            }
            if(userRequest.getPhone()!=null){
                user.setPhone(userRequest.getPhone());
            }
            if(userRequest.getAddress()!=null){
                user.setAddress(userRequest.getAddress());
            }
            if(userRequest.getDob()!=null){
                user.setDob(userRequest.getDob());
            }
            if(userRequest.getSex()!=null){
                user.setSex(userRequest.getSex());
            }
            if(userRequest.getPassword()!=null){
                user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            }
            if(userRequest.getInformationAgent()!=null){
                user.setInformationAgent(userRequest.getInformationAgent());
            }
            return userRepository.save(user);
        }catch (Exception e) {
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
