package com.auth_spring_react.server.service;

import com.auth_spring_react.server.dto.UserRequest;
import com.auth_spring_react.server.dto.UserResponse;
import com.auth_spring_react.server.entity.Role;
import com.auth_spring_react.server.entity.User;
import com.auth_spring_react.server.repository.RoleRepository;
import com.auth_spring_react.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public UserResponse getUserById(Long id) throws UsernameNotFoundException {
        return UserResponse.toUserResponseFromUser(
                userRepository.findById(id).orElseThrow(
                        () -> new UsernameNotFoundException("User with id " + id + " not found")
                )
        );
    }

    // TODO better rewrite all with mapper
    public UserResponse createUser(UserRequest userRequest) {

        Set<Role> authorities = new HashSet<>();

        for (String roleString : userRequest.getAuthority()) {
            Optional<Role> findRole = roleRepository.findByAuthority(roleString);
            findRole.ifPresent(authorities::add);
        }

        User newUser = User.builder()
                .username(userRequest.getUsername())
                .email(userRequest.getEmail())
                .password(encoder.encode(userRequest.getPassword()))
                .authorities(authorities)
                .build();

        return UserResponse.toUserResponseFromUser(userRepository.save(newUser));
    }

    public UserResponse deleteUser(Long id) {
        UserResponse userResponse =  this.getUserById(id);
        userRepository.deleteById(id);
        return userResponse;
    }
}
