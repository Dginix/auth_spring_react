package com.auth_spring_react.server.service;

import com.auth_spring_react.server.dto.UserRequest;
import com.auth_spring_react.server.dto.UserResponse;
import com.auth_spring_react.server.model.User;
import com.auth_spring_react.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name " + username + " not found"));
    }

    public UserResponse getUserById(Long id) throws UsernameNotFoundException {
        return UserResponse.toUserResponseFromUser(
                userRepository.findById(id).orElseThrow(
                        () -> new UsernameNotFoundException("User with id " + id + " not found")
                )
        );
    }

    public boolean isUserExist(String username) {
        return userRepository.existByUsername(username);
    }

    public UserResponse createUser(UserRequest userRequest) {
        User newUser = userRepository.save(User.toUserFromUserRequest(userRequest));
        return UserResponse.toUserResponseFromUser(newUser);
    }

    public UserResponse deleteUser(Long id) {
        UserResponse userResponse =  this.getUserById(id);
        userRepository.deleteById(id);
        return userResponse;
    }
}
