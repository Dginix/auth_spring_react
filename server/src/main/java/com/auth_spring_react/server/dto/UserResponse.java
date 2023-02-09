package com.auth_spring_react.server.dto;

import com.auth_spring_react.server.entity.Role;
import com.auth_spring_react.server.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Set;

@AllArgsConstructor
@Getter
@Builder
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private Set<Role> authorities;

    public static UserResponse toUserResponseFromUser(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .authorities(user.getAuthorities())
                .build();
    }
}
